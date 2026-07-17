# Recording a demo GIF

A short clip of the Hebrew verbs cycling in the spinner is the best way to sell
this project. Here's a 30-second recipe.

## Option A — asciinema (crisp, tiny, text-based)

```bash
# 1. install once
brew install asciinema        # or: pipx install asciinema

# 2. apply the verbs and start recording
npx claude-medarbek
asciinema rec demo.cast

# 3. inside the recording, run Claude Code and ask it something that "thinks"
claude
# ...ask a question, let the spinner cycle (מדרבק… מכווצץ… מסנטז…), then exit

# 4. stop recording: Ctrl-D, then upload or convert
asciinema upload demo.cast
```

Convert a `.cast` to a GIF with [`agg`](https://github.com/asciinema/agg):

```bash
agg demo.cast docs/demo.gif
```

## Option B — screen-record a GIF directly

- macOS: [Kap](https://getkap.co) or `Cmd-Shift-5` → export to GIF.
- Linux: [Peek](https://github.com/phw/peek).

Keep it short (a few spinner cycles), crop to the terminal, and aim for a small
file (< 2 MB) so it loads fast in the README.

## Wire it into the README

Save the file as `docs/demo.gif`, then add near the top of `README.md`:

```markdown
![Hebrew spinner verbs in action](./docs/demo.gif)
```

> Tip: record with a dark terminal theme and a slightly larger font — the RTL
> Hebrew reads best that way.
