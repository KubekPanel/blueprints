# Kubek blueprints

**English** · [Русский](README.ru.md)

Server types for [Kubek](https://github.com/KubekPanel) beyond the ones built into the panel. Install them from
the **Catalog** tab on the **Server Types** page.

Want to add yours? See [CONTRIBUTING.md](CONTRIBUTING.md).

## Index

[`index.json`](https://kubekpanel.github.io/blueprints/index.json) has everything from this repo with versions, download links and sha256. It's for
the panel and other tools. It's rebuilt on every push and every 6 hours, packages are built right here: official ones
from `official/`, community ones from the commit pinned in their entry. If a build fails or GitHub is down, the previous version stays. Ids from
[`blocklist.json`](blocklist.json) are left out and listed in `blocked`, so the panel can warn people who
already have them installed.

```sh
bun install
bun run validate            # local checks
bun run validate --remote   # also build and check community entries
bun run build               # dist/index.json, icons and packages
```

## Official

Made by the Kubek team, files are in [`official/`](official).

- [BeamMP](official/beammp): multiplayer server for BeamNG.drive, Windows and Linux

## Community

These live in their authors' repos, the `.kbp` is built here from a reviewed commit. Every new commit is
reviewed before it gets here, but reviews miss things, so look at what you install.

_Nothing here yet :(_
