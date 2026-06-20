import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const extensionDir = join(root, "extension");
const manifestPath = join(extensionDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

assert.equal(manifest.manifest_version, 3, "manifest_version deve ser 3");
assert.equal(manifest.version, "0.1.0", "versao local deve ser 0.1.0");
assert.deepEqual([...manifest.permissions].sort(), ["activeTab", "storage"], "permissoes devem ser minimas");

const manifestRefs = [
  manifest.action.default_popup,
  ...Object.values(manifest.action.default_icon),
  ...Object.values(manifest.icons)
];

for (const ref of manifestRefs) {
  assert.ok(existsSync(join(extensionDir, ref)), `referencia ausente no manifest: ${ref}`);
}

const popupHtml = readFileSync(join(extensionDir, manifest.action.default_popup), "utf8");
assert.ok(!/https?:\/\//i.test(popupHtml), "popup nao deve carregar recursos remotos");
assert.ok(!/<script[^>]*type=["']module["']/i.test(popupHtml), "popup deve continuar simples sem build");

for (const ref of ["../lib/domain.js", "../lib/storage.js", "../lib/backup.js", "popup.js", "popup.css"]) {
  const normalized = ref.replace("../", "");
  const path = ref.startsWith("../")
    ? join(extensionDir, normalized)
    : join(extensionDir, "popup", ref);
  assert.ok(existsSync(path), `referencia do popup ausente: ${ref}`);
}

console.log("extension validation ok");
