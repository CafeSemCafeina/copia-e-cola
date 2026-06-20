import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const extensionDir = join(root, "dist");
const manifestPath = join(extensionDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

assert.equal(manifest.manifest_version, 3, "manifest_version deve ser 3");
assert.equal(manifest.version, "0.1.0", "versao local deve ser 0.1.0");
assert.deepEqual([...manifest.permissions].sort(), ["activeTab", "storage"], "permissoes devem ser minimas");

const manifestRefs = [
  manifest.action.default_popup,
  manifest.background.service_worker,
  manifest.options_page || manifest.options_ui?.page,
  ...Object.values(manifest.action.default_icon),
  ...Object.values(manifest.icons || {})
];

for (const ref of manifestRefs) {
  const normalizedRef = ref.replace(/^\/+/, "");
  assert.ok(existsSync(join(extensionDir, normalizedRef)), `referencia ausente no manifest: ${ref}`);
}

const popupHtml = readFileSync(join(extensionDir, manifest.action.default_popup), "utf8");
assert.ok(!/https?:\/\//i.test(popupHtml), "popup nao deve carregar recursos remotos");

assert.equal(manifest.background.service_worker, "background.js", "background service worker deve estar declarado");
assert.equal(manifest.options_page || manifest.options_ui?.page, "options.html", "options deve estar declarado");

for (const page of [
  join(extensionDir, "welcome.html"),
  join(extensionDir, "options.html")
]) {
  const html = readFileSync(page, "utf8");
  assert.ok(!/https?:\/\//i.test(html), `${page} nao deve carregar recursos remotos`);
}

assert.ok(existsSync(join(extensionDir, "assets", "icons", "icon-128.png")), "icone publicavel ausente");
assert.ok(!popupHtml.includes("unpkg.com") && !popupHtml.includes("cdn.jsdelivr.net"), "popup nao deve depender de CDN");

console.log("extension validation ok");
