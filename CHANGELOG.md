# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to
follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0]

### Added
- `--reverse` flag: pre-reverses each verb (grapheme-aware) for terminals
  without bidirectional-text support (kitty, Alacritty, Ghostty…) that would
  otherwise draw Hebrew backwards. Documented in the README as a cosmetic
  workaround; the shipped verb lists stay canonical.
- New verbs, bringing the list to 291 (with matching feminine forms): `מקסטם`
  (customizing), `מג'נגל` (juggling), `מרטרב` (retrieving), and `מפאר`
  (opening a PR).

### Changed
- Publish to npm automatically via GitHub Actions on a published Release or a
  pushed `v*.*.*` tag, with npm provenance.

## [1.0.2]

### Added
- Demo GIF in the README (absolute URL, so it renders on npmjs.com too).

## [1.0.1]

### Changed
- Reworded package, plugin, and repo descriptions ("funny Hebrew verbs" →
  "Hebrew verbs"). No functional changes.

## [1.0.0]

### Added
- 287 Hebrew spinner verbs in [`verbs.json`](./verbs.json) — dev/AI
  loanwords (מברווז, מראגג, מווייבב, מרבייס…) alongside Hebrew slang and
  group-chat originals (מתפקשש, מסתלבט, מדרדס, מצ'קמק…).
- Community `.github` issue template for suggesting verbs, a Credits section,
  and a `docs/RECORDING.md` demo-recording guide.
- `PROMPT.md`: a self-contained brief that lets a local Claude Code rebuild the
  whole project (all verbs, schema, code spec, and maintenance rules).
- Feminine form for every verb in [`verbs.fem.json`](./verbs.fem.json) (one per
  verb, same order), selectable via the `--feminine` flag. Loanword feminines are
  best-effort.
- `npx claude-medarbek` CLI with `--global` / `--project`,
  `--append` / `--replace`, `--print`, and `--help`.
- Safe merge into an existing `settings.json` — other keys are preserved, and
  invalid-JSON files are never overwritten.
- `install.sh` wrapper for non-npm use, plus a ready-to-copy
  [`settings.json`](./settings.json) block.
- `.claude-plugin/plugin.json` manifest, MIT license, contributing guide,
  code of conduct, and CI (JSON validation + CLI smoke/merge tests).
