# Contributing

**English** · [Русский](CONTRIBUTING.ru.md)

## Adding a blueprint

1. Keep the blueprint in **your own public GitHub repo** with a license. The sources (`blueprint.json`,
   `versions.ts`, icon) must be in the repo. Start from
   [blueprint-template](https://github.com/KubekPanel/blueprint-template).
2. Open a PR here with:
   - a file `community/<id>.json`:
     ```json
     {
       "id": "com.yourname.palworld",
       "repo": "yourname/kubek-palworld",
       "commit": "4f1c2a9e0b7d3c5e8f6a1b2c3d4e5f6a7b8c9d0e"
     }
     ```
     `commit` is the full sha of the commit to publish. If the manifest is not in the repo root, add
     `"path": "folder/inside/repo"`.
   - a line in the **Community** list of `README.md` and **От сообщества** in `README.ru.md`, sorted by
     name. English description is fine in both:
     ```md
     - [Palworld](https://github.com/yourname/kubek-palworld) - Palworld dedicated server. Linux, Windows
     ```
3. CI builds the package from that commit and checks it. The code of the commit is checked manually.

To check before the PR: `bun install && bun run validate --remote community/<id>.json`.

**Updates** go through a PR that changes `commit`. Tag a new version in your repo and a bot opens the PR
within 6 hours, or open it yourself. Each new commit is reviewed before merge, so updates take a bit
longer, but what gets installed is exactly the reviewed code. Releases are optional, the bot follows your
latest release or, without releases, your newest tag.

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
