# Contributing

**English** · [Русский](CONTRIBUTING.ru.md)

## Adding a blueprint

1. Keep the blueprint in **your own public GitHub repo** with a license. The sources (`blueprint.json`,
   `versions.ts`, icon) must be in the repo, not only in the release. Start from
   [blueprint-template](https://github.com/KubekPanel/blueprint-template).
2. Publish a **GitHub release** (not a pre-release) with one `.kbp` asset. The tag matches the manifest
   version: `1.2.0` or `v1.2.0` for `"version": "1.2.0"`.
3. Open a PR here with:
   - a file `community/<id>.json`:
     ```json
     {
       "id": "com.yourname.palworld",
       "repo": "yourname/kubek-palworld"
     }
     ```
     If a release has several `.kbp` files, add `"asset": "palworld.kbp"`.
   - a line in the **Community** list of `README.md` and **От сообщества** in `README.ru.md`, sorted by
     name. English description is fine in both:
     ```md
     - [Palworld](https://github.com/yourname/kubek-palworld) - Palworld dedicated server. Linux, Windows
     ```
4. CI downloads your latest release and checks it. Source code is checked manually.

To check before the PR: `bun install && bun run validate --remote community/<id>.json`.

**Updates** don't need a PR, just publish a new release with the tag matching the manifest version. The
index picks it up within 6 hours. If the release fails the checks, the previous version stays and the
warning shows up in the Publish index workflow.

## Rules

- `id` is reverse-domain and lowercase (`com.yourname.game`), the same in the manifest and the file name.
  `com.kubek.` is reserved for official blueprints.
- The manifest has `manifestVersion: 1`, a semver `version`, `name`, `description`, `author.name` and
  `engines.kubek`. If the icon is a file, it's a `.png` inside the package. Set `platforms` if the server doesn't run
  everywhere.
- Servers are downloaded only from the official sources of the game or its developers, no re-hosted mirrors.
- No game files you have no right to share. If the server needs files from the player's copy of the game,
  explain in the README how to get them.
- `exec` only when no declarative step does the job, and the README lists what each `exec` runs.
- No telemetry, miners, hidden downloads or touching files outside the server folder.
- The README says what the blueprint does, which platforms it runs on and its known limits.

Entries that break the rules, stay broken for long or lose their repo are removed. Harmful ones also go
to `blocklist.json` with the reason, so panels that installed them can warn their users. Found a problem?
[Open an issue](../../issues/new/choose).

## Official blueprints

`official/<name>/` holds the sources and the built `.kbp`. Bump `version` and rebuild the `.kbp` on every
change, `bun run validate` fails if the package and the sources have different versions.
