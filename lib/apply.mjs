// Core merge logic — kept separate from the CLI so it can be tested/imported.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

export const MODES = ["append", "replace"];

/** Read a settings.json file, returning {} when missing/empty. Throws on bad JSON. */
export function readSettings(path) {
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, "utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
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
    const err = new Error(`${settingsPath} is not valid JSON`);
    err.code = "EBADJSON";
    throw err;
  }

  settings.spinnerVerbs = { mode, verbs };

  mkdirSync(dirname(settingsPath), { recursive: true });
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
  return settings;
}
