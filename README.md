# Kubek blueprints

**English** · [Русский](README.ru.md)

Server types for [Kubek](https://github.com/KubekPanel) beyond the ones built into the panel. Download a `.kbp`
and install it on the **Server Types** page.

Want to add yours? See [CONTRIBUTING.md](CONTRIBUTING.md).

## Index

[`index.json`](https://kubekpanel.github.io/blueprints/index.json) has everything from this repo with versions, download links and sha256. It's for
the panel and other tools. It's rebuilt on every push and every 6 hours, community entries come from their
latest release. If a release is broken or GitHub is down, the previous version stays. Ids from
[`blocklist.json`](blocklist.json) are left out and listed in `blocked`, so the panel can warn people who
already have them installed.

```sh
bun install
bun run validate            # local checks
bun run validate --remote   # also download and check community releases
bun run build               # dist/index.json and icons
```

## Official

Made by the Kubek team, files are in [`official/`](official).

_Nothing here yet :(_

## Community

These live in their authors' repos, the `.kbp` comes from their releases. A blueprint is checked once when
it's added, its updates are not, so look at what you install.

_Nothing here yet :(_
