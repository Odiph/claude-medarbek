# claude-medarbek 🌀

> Make Claude Code think in **funny Hebrew**. Instead of _Thinking…_ you get
> **מדרבק… · מהלוצינט… · מכווצץ… · שולק…**

[![CI](https://github.com/Odiph/claude-medarbek/actions/workflows/ci.yml/badge.svg)](https://github.com/Odiph/claude-medarbek/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-add-a-verb-yes-you)

Claude Code shows a little verb next to its spinner while it works. This swaps
the English ones for a growing pile of playful, made-up Hebrew verbs — some are
real words, some are lovingly mangled loanwords, all are ridiculous.

*[עברית ↓](#עברית)*

---

## A taste 😋

| Verb | The joke |
| --- | --- |
| **מדרבק** | "de-bugging", Hebrew-style |
| **מהלוצינט** | hallucinating — the AI classic |
| **מקמיט** | committing (to the bit) |
| **מג'נרט** | generating |
| **מתפלסף** | philosophizing instead of answering |
| **שולק** | boiling — thinking so hard it's cooking |
| **מזמבר** | bamboozling |
| **מתמזגן** | air-conditioning itself, apparently |

…and **270+ more**, each with a feminine form. The full list lives in
[`verbs.json`](./verbs.json) — but honestly, the fun is being surprised by them
live. 🎲

## Quick start

```bash
npx claude-medarbek            # global  (~/.claude/settings.json)
npx claude-medarbek --project  # this project only
npx claude-medarbek --feminine # feminine forms
npx claude-medarbek --print    # just show the JSON, write nothing
```

Then open a **new** Claude Code session and watch the spinner. 🌀

<sub>No Node? Clone the repo and run `./install.sh`, or paste the block from
[`settings.json`](./settings.json) into your settings by hand.</sub>

## How it works

Claude Code (v2.1.23+) supports a `spinnerVerbs` setting. This tool safely
merges a Hebrew list into your `settings.json` — without touching your other
settings, and refusing to run if the file is invalid JSON.

```json
{ "spinnerVerbs": { "mode": "replace", "verbs": ["מדרבק", "מהלוצינט"] } }
```

---

## 🎉 Add a verb (yes, you)

**This repo runs on community silliness.** If you thought of a funnier verb,
it belongs here. Seriously — one-word contributions are the best ones.

**Easiest:** open a [**Suggest-a-verb issue**](https://github.com/Odiph/claude-medarbek/issues/new/choose)
and drop your idea. Done.

**Or send a PR** — add your verb to **three files, same position** (they stay in
lockstep, and CI checks it):
1. [`verbs.json`](./verbs.json) — the masculine form (the spinner list)
2. [`verbs.fem.json`](./verbs.fem.json) — its feminine form
3. [`settings.json`](./settings.json) — same as `verbs.json`

**House rules** (short):
- Present tense, usually starting with **מ־** (מדרבק, מכווצץ).
- The more absurd / made-up, the better. Puns and mangled loanwords encouraged.
- Nothing offensive or aimed at a person or group.
- Not already in the list (CI will tell you).

New here? Open-source contributions don't get gentler than "add a funny word."
See [CONTRIBUTING.md](./CONTRIBUTING.md). First PR? We'd love it to be this one. 💛

## Credits

Every verb was dreamed up by friends riffing in group chats. Add a verb → add
yourself to the list.

## License

[MIT](./LICENSE) — take it, remix it, translate the whole idea to your language.

---

<a name="עברית"></a>

## עברית

הופכים את פעלי ה"חשיבה" של **Claude Code** לעברית מצחיקה. במקום _Thinking…_
מקבלים **מדרבק… · מהלוצינט… · מכווצץ… · שולק…** — יותר מ-**280 פעלים**, לכל אחד
צורת זכר ונקבה. חלקם מילים אמיתיות, חלקם מילים לועזיות מעוותות באהבה, כולם מטופשים.

### התקנה מהירה

```bash
npx claude-medarbek            # גלובלי (~/.claude/settings.json)
npx claude-medarbek --project  # רק לפרויקט הנוכחי
npx claude-medarbek --feminine # צורות נקבה
npx claude-medarbek --print    # רק להדפיס את ה-JSON
```

אחר כך פתחו סשן חדש של Claude Code ותראו את הספינר. 🌀
(בלי Node? שכפלו והריצו `./install.sh`, או העתיקו ידנית מ-[`settings.json`](./settings.json).)

### 🎉 תוסיפו פועל (כן, אתם)

**ה-repo הזה חי על טיפשות קהילתית.** חשבתם על פועל מצחיק יותר? הוא שייך לכאן.
ברצינות — תרומות של מילה אחת הן הכי טובות.

- **הכי קל:** פתחו [**issue של הצעת פועל**](https://github.com/Odiph/claude-medarbek/issues/new/choose).
- **או PR** — הוסיפו את הפועל ל-**שלושה קבצים, באותו מיקום**: `verbs.json` (זכר),
  `verbs.fem.json` (נקבה), ו-`settings.json` (זהה ל-verbs.json). ה-CI בודק סנכרון.

**כללים קצרים:** הווה, בדרך כלל מתחיל ב-מ׳; כמה שיותר מומצא ומצחיק; בלי פוגעני;
לא כפול. PR ראשון בחיים? שיהיה זה. 💛

### קרדיטים

כל פועל הומצא ע"י חברים שזרקו רעיונות בקבוצות. הוספת פועל → הוסף את עצמך לרשימה.
