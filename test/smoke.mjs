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

  // 0. no duplicate verbs — the README promises CI catches these
  assert.equal(new Set(verbs).size, verbs.length, "verbs.json contains a duplicate verb");

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

  // 4b. valid JSON that is not an object (array/null/string) is refused untouched —
  // stringify would silently drop spinnerVerbs assigned onto an array
  for (const bad of ["[]", "null", '"text"', "5"]) {
    const p = join(dir, `nonobj-${Buffer.from(bad).toString("hex")}.json`);
    writeFileSync(p, bad);
    assert.throws(
      () => applyVerbs({ settingsPath: p, mode: "replace", verbs }),
      (e) => e.code === "EBADJSON",
      `non-object settings ${bad} must be rejected as EBADJSON`
    );
    assert.equal(readFileSync(p, "utf8"), bad, `non-object settings ${bad} must be untouched`);
  }

  // 4c. UTF-8 BOM (common on Windows) is tolerated, existing keys survive
  const pBom = join(dir, "bom.json");
  writeFileSync(pBom, "\uFEFF" + JSON.stringify({ model: "opus" }));
  applyVerbs({ settingsPath: pBom, mode: "replace", verbs });
  const sBom = JSON.parse(readFileSync(pBom, "utf8"));
  assert.equal(sBom.model, "opus", "keys behind a BOM must survive the merge");
  assert.equal(sBom.spinnerVerbs.verbs.length, verbs.length);

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
  assert.equal(new Set(fem).size, fem.length, "verbs.fem.json contains a duplicate verb");

  // 6. package.json and .claude-plugin/plugin.json versions stay in sync
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
  const plugin = JSON.parse(readFileSync(new URL("../.claude-plugin/plugin.json", import.meta.url)));
  assert.equal(plugin.version, pkg.version, "plugin.json version must match package.json");

  console.log("✓ all smoke tests passed");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
