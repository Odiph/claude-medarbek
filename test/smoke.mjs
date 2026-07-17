// Minimal smoke test — no framework. Exercises the merge logic end to end.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { applyVerbs, MODES } from "../lib/apply.mjs";

const verbs = JSON.parse(readFileSync(new URL("../verbs.json", import.meta.url)));
const dir = mkdtempSync(join(tmpdir(), "hsv-"));

try {
  assert.ok(verbs.length > 0, "verbs.json should be non-empty");
  assert.deepEqual(MODES, ["append", "replace"]);

  // 1. fresh file, replace
  const p1 = join(dir, "a.json");
  applyVerbs({ settingsPath: p1, mode: "replace", verbs });
  const s1 = JSON.parse(readFileSync(p1, "utf8"));
  assert.equal(s1.spinnerVerbs.mode, "replace");
  assert.equal(s1.spinnerVerbs.verbs.length, verbs.length);

  // 2. existing keys preserved, append
  const p2 = join(dir, "b.json");
  writeFileSync(p2, JSON.stringify({ model: "opus", spinnerTipsEnabled: true }));
  applyVerbs({ settingsPath: p2, mode: "append", verbs });
  const s2 = JSON.parse(readFileSync(p2, "utf8"));
  assert.equal(s2.model, "opus", "existing keys must survive the merge");
  assert.equal(s2.spinnerTipsEnabled, true);
  assert.equal(s2.spinnerVerbs.mode, "append");

  // 3. invalid JSON is never overwritten
  const p3 = join(dir, "c.json");
  writeFileSync(p3, "{ broken");
  assert.throws(
    () => applyVerbs({ settingsPath: p3, mode: "replace", verbs }),
    (e) => e.code === "EBADJSON"
  );
  assert.equal(readFileSync(p3, "utf8"), "{ broken", "bad file must be untouched");

  // 4. bad mode rejected
  assert.throws(() => applyVerbs({ settingsPath: join(dir, "d.json"), mode: "nope", verbs }));

  // 5. feminine list mirrors verbs.json 1:1 and is actually feminine (ends in ת or ה)
  const fem = JSON.parse(readFileSync(new URL("../verbs.fem.json", import.meta.url)));
  assert.equal(
    fem.length,
    verbs.length,
    "verbs.fem.json must have one feminine form per verb in verbs.json"
  );
  assert.ok(
    fem.every((w) => /[תה]$/.test(w)),
    "feminine forms should end in ת or ה"
  );

  console.log("✓ all smoke tests passed");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
