import type { KubekBlueprintManifest } from "@kubekpanel/blueprint-sdk";
import type { Files, Manifest } from "./lib";

export const KIND = "blueprint";
export const REPO = "KubekPanel/blueprints";
export const PAGES_URL = "https://kubekpanel.github.io/blueprints";
export const MANIFEST_FILE = "blueprint.json";
export const PACKAGE_EXT = ".kbp";
export const RESERVED_PREFIX = "com.kubek.";

// what the panel supports right now
const VERSION_KINDS = ["none", "static", "http", "resolver"];
const RUNTIME_KINDS = ["native", "docker"];
const PLATFORMS = ["win32", "linux", "darwin"];

// keep in sync with the panel, server-types-registry.service.ts
export function checkManifest(m: Manifest, files: Files): string[] {
  const errors: string[] = [];
  if (!m.game) errors.push("game is required");
  if (!RUNTIME_KINDS.includes(m.runtime?.kind))
    errors.push(`unsupported runtime.kind: ${m.runtime?.kind}`);
  if (!VERSION_KINDS.includes(m.versions?.kind))
    errors.push(`unsupported versions.kind: ${m.versions?.kind}`);
  if (m.versions?.kind === "resolver" && !files.has(m.versions.module))
    errors.push(`resolver ${m.versions.module} is not in the package`);
  if (!Array.isArray(m.install?.steps)) errors.push("install.steps must be an array");
  if (!m.startup?.command) errors.push("startup.command is required");
  if (!Array.isArray(m.ports)) errors.push("ports must be an array");
  for (const p of m.platforms ?? [])
    if (!PLATFORMS.includes(p)) errors.push(`unknown platform "${p}"`);
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
