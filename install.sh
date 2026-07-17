#!/usr/bin/env bash
# מתקין את פעלי-הספינר העבריים ל-Claude Code (עוטף את bin/cli.mjs).
#
# שימוש:
#   ./install.sh              # גלובלי: ~/.claude/settings.json  (replace)
#   ./install.sh --project    # הפרויקט הנוכחי: .claude/settings.json
#   ./install.sh --append     # מוסיף לברירות המחדל במקום להחליף
#   ./install.sh --print      # מדפיס את בלוק ה-JSON בלבד
#
# אם מותקן Node אפשר גם פשוט:  npx claude-medarbek
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "צריך Node.js (גרסה 18+) כדי להריץ את הסקריפט הזה." >&2
  exit 1
fi

exec node "$DIR/bin/cli.mjs" "$@"
