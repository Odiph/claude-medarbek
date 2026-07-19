// Core merge logic — kept separate from the CLI so it can be tested/imported.
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from "node:fs";
import { dirname } from "node:path";

export const MODES = ["append", "replace"];

// Grapheme segmenter reused across calls — construction is comparatively costly.
const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/**
 * Reverse the grapheme order of a single verb.
 *
 * Terminals without bidirectional-text support (kitty, Alacritty, Ghostty, …)
 * draw codepoints strictly left-to-right in logical order, so a Hebrew word
 * stored correctly renders visually reversed. Pre-reversing the graphemes makes
 * those terminals display it in correct right-to-left reading order. It is a
 * cosmetic display hack: the stored string is genuinely backwards, so copy-paste
 * yields reversed text and a BiDi-aware terminal would double-reverse it.
 *
 * Grapheme-aware (not a plain codepoint reverse) so any combining marks stay
 * attached to their base letter.
 */
export function reverseVerb(word) {
  return [...graphemeSegmenter.segment(word)]
    .map((s) => s.segment)
    .reverse()
    .join("");
}

/**
 * Read a settings.json file, returning {} when missing/empty. Throws when the
 * content is not a JSON object — arrays and primitives are valid JSON but
 * would be silently mangled by the merge, so they abort too.
 */
export function readSettings(path) {
  if (!existsSync(path)) return {};
  // Strip a UTF-8 BOM (common on Windows) — JSON.parse rejects it.
  const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
  if (!raw) return {};
  const parsed = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("settings root must be a JSON object");
  }
  return parsed;
}

/**
 * Merge a spinnerVerbs block into an existing settings.json without touching
 * any other keys. Returns the resulting settings object.
 * @param {{ settingsPath: string, mode: "append"|"replace", verbs: string[] }} opts
 */
export function applyVerbs({ settingsPath, mode, verbs }) {
  if (!MODES.includes(mode)) {
    throw new Error(`invalid mode "${mode}" (expected "append" or "replace")`);
  }
  if (!Array.isArray(verbs) || verbs.length === 0) {
    throw new Error("verbs must be a non-empty array");
  }

  let settings;
  try {
    settings = readSettings(settingsPath);
  } catch {
    const err = new Error(`${settingsPath} is not a valid JSON settings object`);
    err.code = "EBADJSON";
    throw err;
  }

  const next = { ...settings, spinnerVerbs: { mode, verbs } };

  mkdirSync(dirname(settingsPath), { recursive: true });
  // Write to a sibling temp file then rename, so a crash mid-write can never
  // leave the user's real settings.json truncated.
  const tmpPath = `${settingsPath}.medarbek-${process.pid}.tmp`;
  writeFileSync(tmpPath, JSON.stringify(next, null, 2) + "\n");
  renameSync(tmpPath, settingsPath);
  return next;
}
