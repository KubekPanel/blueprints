import type { KubekBlueprintManifest } from "@kubekpanel/blueprint-sdk";
import type { Files, Manifest } from "./lib";
import { validateManifest } from "./manifest-rules";

export const KIND = "blueprint";
export const REPO = "KubekPanel/blueprints";
export const PAGES_URL = "https://kubekpanel.github.io/blueprints";
export const MANIFEST_FILE = "blueprint.json";
export const PACKAGE_EXT = ".kbp";
export const RESERVED_PREFIX = "com.kubek.";

// same rules as the panel, plus what only the catalog needs
export function checkManifest(m: Manifest, files: Files): string[] {
  const errors = validateManifest(m);
  if (!m.game) errors.push("game is required");
  if (m.versions?.kind === "resolver" && typeof m.versions.module === "string" && !files.has(m.versions.module))
    errors.push(`resolver ${m.versions.module} is not in the package`);
  return errors;
}

// what the panel shows before download
export function indexFields(manifest: Manifest) {
  const m = manifest as KubekBlueprintManifest;
  return {
    shortName: m.shortName ?? null,
    game: m.game,
    gameName: m.gameName ?? null,
    tags: m.tags ?? [],
    platforms: m.platforms ?? null,
    runtime: m.runtime.kind,
    // lets the panel warn about exec and steamcmd
    installSteps: [...new Set(m.install.steps.map((s) => s.type))].sort(),
  };
}
