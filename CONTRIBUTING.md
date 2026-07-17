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
- Describe what you added and why it's funny — a one-liner is fine.
- Make sure `npm test` passes.

By contributing you agree that your contributions are licensed under the
project's [MIT License](./LICENSE).
