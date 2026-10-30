// Checks every template against its node definition and the contract rules of the inventory menu replacement.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPack, checkTemplate } from "@inkwell-ui/core-pack/scripts/lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { manifest, nodes } = loadPack(root);

test("every template agrees with its pins and fields", () => {
  for (const n of nodes) assert.deepEqual(checkTemplate(n.def, n.text, manifest.id), [], n.id);
});

test("15 contract nodes for InventoryMenu, none needs the runtime", () => {
  assert.equal(nodes.length, 15);
  for (const n of nodes) {
    assert.equal(n.def.contract, "InventoryMenu", n.id);
    assert.equal(n.def.category, "Inventory", n.id);
    assert.ok(!n.def.requiresRuntime, n.id);
    assert.ok(n.def.title.startsWith("Inventory: "), n.id);
  }
});

test("templates talk to the engine only through _root.inkwellContract on/send/select/list", () => {
  for (const n of nodes) {
    for (const [, member] of n.text.matchAll(/_root\.inkwellContract\.(\w+)/g)) assert.ok(["on", "send", "select", "list"].includes(member), `${n.id}: ${member}`);
    assert.ok(!/__g\.bridge/.test(n.text), n.id);
  }
});

test("while core still has a node, the copy has the same template body", () => {
  const coreDir = path.resolve(root, "../Inkwell-Core-Pack");
  const body = (s) => s.replace(/\r/g, "").split("\n").slice(1).join("\n");
  for (const n of nodes) {
    const f = path.join(coreDir, "templates", n.def.kind + ".as2");
    if (fs.existsSync(f)) assert.equal(body(n.text), body(fs.readFileSync(f, "utf8")), n.id);
  }
});
