# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to
follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

### Added
- 287 funny Hebrew spinner verbs in [`verbs.json`](./verbs.json) — dev/AI
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
