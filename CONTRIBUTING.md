# Contributing

Thanks for wanting to make Claude Code funnier in Hebrew! 🎉

## Adding verbs

1. Edit [`verbs.json`](./verbs.json) — a plain array of strings.
2. Keep the style: present-tense, masculine-singular (the `מ־` prefix), and
   ideally a bit absurd. Invented tech-flavored verbs (מדרבק, מכווצץ) are the
   whole point.
3. Keep [`settings.json`](./settings.json) in sync (it's the same list wrapped
   in a `spinnerVerbs` block). CI checks that both are valid JSON.
4. Avoid anything offensive, political, or targeting a person or group.

## Running it locally

```bash
npx --no-install node bin/cli.mjs --print   # preview, writes nothing
node bin/cli.mjs --project                  # write to ./.claude/settings.json
npm test                                     # smoke test
```

## Pull requests

- One theme per PR when possible (e.g. "dev verbs", "kitchen verbs").
- Describe what you added and the joke behind it — a one-liner is fine.
- Make sure `npm test` passes.

By contributing you agree that your contributions are licensed under the
project's [MIT License](./LICENSE).

## Releasing (maintainers)

Publishing to npm is automated by
[`.github/workflows/publish.yml`](./.github/workflows/publish.yml) using npm
**trusted publishing (OIDC)**: no npm token or repo secret is involved. Bump
the version in `package.json`, then publish a GitHub Release or push a
`v*.*.*` tag (or run the workflow manually from the Actions tab).

Trust is configured on npmjs.com → `claude-medarbek` → Settings → Trusted
Publisher (owner `Odiph`, repo `claude-medarbek`, workflow `publish.yml`). If
the workflow file is renamed, update it there too.

History: the first publish setup (2026-07-19) used a granular npm token
(`github-publish`) stored as the `NPM_TOKEN` repo secret; the workflow moved to
trusted publishing the same day (#8). The unused `NPM_TOKEN` secret was deleted
on 2026-10-14 and the token was left to expire on 2026-10-17. Don't add a token
back; fix the Trusted Publisher config instead.
