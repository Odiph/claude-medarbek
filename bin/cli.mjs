#!/usr/bin/env node
// claude-medarbek — funny Hebrew verbs for Claude Code's thinking spinner.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { applyVerbs } from "../lib/apply.mjs";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const KNOWN_FLAGS = new Set([
  "--global", "--project", "--append", "--replace",
  "--feminine", "--fem", "--print", "-h", "--help",
]);

const args = process.argv.slice(2);
const has = (...flags) => flags.some((f) => args.includes(f));

if (has("-h", "--help")) {
  printHelp();
  process.exit(0);
}

// A typo like --projct must not silently fall through to the default
// (replacing the user's *global* settings), so unknown args are fatal.
const unknown = args.filter((a) => !KNOWN_FLAGS.has(a));
if (unknown.length > 0) {
  console.error(`✗ Unknown option: ${unknown.join(", ")}\n`);
  printHelp();
  process.exit(1);
}

if (has("--append") && has("--replace")) {
  console.error("✗ --append and --replace are mutually exclusive — pick one.");
  process.exit(1);
}

if (has("--global") && has("--project")) {
  console.error("✗ --global and --project are mutually exclusive — pick one.");
  process.exit(1);
}

const verbsFile = has("--feminine", "--fem") ? "verbs.fem.json" : "verbs.json";
const verbs = JSON.parse(readFileSync(join(pkgRoot, verbsFile), "utf8"));

const mode = has("--append") ? "append" : "replace";

if (has("--print")) {
  process.stdout.write(
    JSON.stringify({ spinnerVerbs: { mode, verbs } }, null, 2) + "\n"
  );
  process.exit(0);
}

const settingsPath = has("--project")
  ? join(process.cwd(), ".claude", "settings.json")
  : join(homedir(), ".claude", "settings.json");

try {
  applyVerbs({ settingsPath, mode, verbs });
  console.log(`✓ Wrote ${verbs.length} Hebrew spinner verbs to ${settingsPath} (mode: ${mode})`);
  console.log("  Open a new Claude Code session (or run /status) to see them.");
} catch (err) {
  if (err.code === "EBADJSON") {
    console.error(`✗ ${settingsPath} is not a valid JSON settings object — aborting so it isn't overwritten.`);
  } else {
    console.error(`✗ ${err.message}`);
  }
  process.exit(1);
}

function printHelp() {
  console.log(`claude-medarbek — funny Hebrew verbs for Claude Code's thinking spinner

Usage:
  npx claude-medarbek [options]

Options:
  --global    Install to ~/.claude/settings.json  (default)
  --project   Install to ./.claude/settings.json
  --append    Add to Claude's built-in verbs
  --replace   Use only these Hebrew verbs         (default)
  --feminine  Use the feminine forms (verbs.fem.json, Hebrew-origin verbs)
  --print     Print the spinnerVerbs JSON block and exit (writes nothing)
  -h, --help  Show this help

Docs: https://github.com/Odiph/claude-medarbek`);
}
