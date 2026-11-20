import type { VersionResolver, VersionResolverContext } from "@kubekpanel/blueprint-sdk";

const RELEASES = "https://api.github.com/repos/BeamMP/BeamMP-Server/releases?per_page=30";

interface GithubAsset {
  name: string;
  browser_download_url: string;
}

interface GithubRelease {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  assets: GithubAsset[];
}

// Older distro builds go first, they need an older glibc and run on more systems
const LINUX_BUILDS = ["ubuntu.22.04", "debian.12", "ubuntu.24.04", "debian.13"];

// The server binary for this OS and CPU, debuginfo files have the same suffixes
function pickAsset(assets: GithubAsset[], platform: VersionResolverContext["platform"]): GithubAsset | null {
  if (platform.os === "win32") return assets.find((a) => a.name === "BeamMP-Server.exe") ?? null;
  if (platform.os !== "linux") return null;
  const arch = platform.arch === "arm64" ? "arm64" : "x86_64";
  for (const build of LINUX_BUILDS) {
    const asset = assets.find((a) => a.name === `BeamMP-Server.${build}.${arch}`);
    if (asset) return asset;
  }
  return null;
}

async function fetchReleases(ctx: VersionResolverContext): Promise<GithubRelease[]> {
  const res = await ctx.fetch(RELEASES, { headers: { "User-Agent": "Kubek", Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`GitHub answered ${res.status}, try again later`);
  const releases = (await res.json()) as GithubRelease[];
  return releases.filter((r) => !r.draft && !r.prerelease);
}

const resolver: VersionResolver = {
  // Only versions that have a build for this host
  async listVersions(ctx) {
    const releases = await fetchReleases(ctx);
    return releases.filter((r) => pickAsset(r.assets, ctx.platform)).map((r) => ({ id: r.tag_name }));
  },

  async resolveDownload(version, ctx) {
    const release = (await fetchReleases(ctx)).find((r) => r.tag_name === version);
    if (!release) throw new Error(`BeamMP ${version} not found`);
    const asset = pickAsset(release.assets, ctx.platform);
    if (!asset) throw new Error(`BeamMP ${version} has no build for this system`);
    return { url: asset.browser_download_url, filename: "BeamMP-Server" };
  },
};

export default resolver;
