import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function assertPng(path, width, height) {
  assert.ok(existsSync(path), `asset ausente: ${path}`);
  const buffer = readFileSync(path);
  assert.ok(buffer.subarray(0, 8).equals(pngSignature), `asset nao e PNG: ${path}`);
  assert.equal(buffer.readUInt32BE(16), width, `largura incorreta: ${path}`);
  assert.equal(buffer.readUInt32BE(20), height, `altura incorreta: ${path}`);
}

for (const size of [16, 32, 48, 128]) {
  assertPng(join("store", "icons", `icon-${size}.png`), size, size);
}

assertPng(join("store", "screenshots", "contexto-por-site-1280x800.png"), 1280, 800);
assertPng(join("store", "screenshots", "salvar-e-reutilizar-1280x800.png"), 1280, 800);
assertPng(join("store", "screenshots", "local-first-1280x800.png"), 1280, 800);
assertPng(join("store", "promotional", "small-tile-440x280.png"), 440, 280);
assertPng(join("store", "promotional", "marquee-1440x560.png"), 1440, 560);

assert.ok(existsSync(join("store", "listing", "pt-BR.md")), "ficha PT-BR ausente");
assert.ok(existsSync(join("site", "index.html")), "landing page ausente");
assert.ok(existsSync(join("site", "privacy.html")), "politica de privacidade ausente");

function assertSitePage(path) {
  const html = readFileSync(path, "utf8");
  assert.ok(!html.includes("../store/"), `${path} nao deve depender de assets fora de site/`);
  assert.ok(!html.includes("extension/"), `${path} nao deve orientar uso da pasta legada extension/`);
  assert.ok(!html.includes("URL externa inexistente"), `${path} nao deve manter placeholder de publicacao`);

  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:)/.test(ref)) continue;
    if (ref.startsWith("#")) continue;
    const cleanRef = ref.split("?")[0];
    if (cleanRef.endsWith(".html") || cleanRef.includes(".") || cleanRef.includes("/")) {
      assert.ok(existsSync(join(dirname(path), cleanRef)), `referencia local ausente em ${path}: ${ref}`);
    }
  }
}

assertSitePage(join("site", "index.html"));
assertSitePage(join("site", "privacy.html"));

assertPng(join("site", "assets", "icons", "icon-128.png"), 128, 128);
assertPng(join("site", "assets", "screenshots", "contexto-por-site-1280x800.png"), 1280, 800);
assertPng(join("site", "assets", "screenshots", "local-first-1280x800.png"), 1280, 800);

console.log("publication assets validation ok");
