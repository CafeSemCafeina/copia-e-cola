import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();

function exists(path) {
  return existsSync(join(root, path));
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

assert.ok(!exists("extension"), "pasta extension/ legada nao deve voltar; use entrypoints/, src/ e public/");

const duplicateJsTests = readdirSync(join(root, "tests")).filter((file) => file.endsWith(".test.js"));
assert.deepEqual(duplicateJsTests, [], "testes duplicados .test.js nao devem existir; use .test.ts");

const packageJson = JSON.parse(read("package.json"));
assert.equal(packageJson.license, "MIT", "package.json deve declarar MIT para o codigo");
assert.ok(packageJson.scripts["validate:boundaries"], "package.json deve expor validate:boundaries");
assert.ok(packageJson.scripts.check.includes("validate:boundaries"), "npm run check deve validar fronteiras do repo");

for (const required of [
  "TRADEMARKS.md",
  "docs/repository-boundaries.md",
  "docs/README.md",
  "docs/adr/0001-open-core-and-cloud-boundary.md",
  "docs/adr/0002-brand-assets-read-only.md",
  "docs/adr/0003-product-packaging-and-pricing.md",
  "docs/adr/0004-stripe-offer-and-checkout-flow.md",
  "docs/PRD.md",
  "docs/archive/legacy-zip-asset-map.md",
  "design-system/screens/payment/README.md",
  "design-system/screens/payment/checkout-copia-e-cola-pro.html",
  "design-system/ASSET_LICENSE.md",
  "store/LICENSE.md",
  "site/assets/LICENSE.md",
  "public/assets/LICENSE.md"
]) {
  assert.ok(exists(required), `arquivo obrigatorio ausente: ${required}`);
}

const readme = read("README.md");
assert.ok(readme.includes("copia-e-cola-cloud"), "README deve apontar cloud para repo privado separado");
assert.ok(readme.includes("Assets de marca"), "README deve explicar fronteira de assets/marca");

const trademarks = read("TRADEMARKS.md");
assert.ok(trademarks.includes("O codigo e livre. A marca Copia e Cola nao e."), "TRADEMARKS.md deve manter regra curta de marca");

const boundaryDoc = read("docs/repository-boundaries.md");
assert.ok(boundaryDoc.includes("backend de sync"), "fronteiras devem listar cloud privado");
assert.ok(boundaryDoc.includes("read-only para portfolio"), "fronteiras devem declarar portfolio read-only");

const prd = read("docs/PRD.md");
assert.ok(prd.includes("Status: artefato versionado"), "PRD deve estar marcado como versionado");
assert.ok(!prd.includes("não versionado por enquanto"), "PRD nao deve se declarar nao versionado");

assert.ok(!exists("docs/product-packaging-pricing.md"), "decisoes de produto/pricing devem ficar em ADR");
assert.ok(!exists("docs/zip-asset-map.md"), "mapa antigo do ZIP deve ficar arquivado, nao na raiz de docs");

const markdownFiles = execSync("git ls-files", { encoding: "utf8" })
  .split(/\r?\n/)
  .filter((file) => file.endsWith(".md") && file !== "README.md" && file !== ".github/pull_request_template.md");

for (const file of markdownFiles) {
  const body = read(file);
  assert.ok(/^Data da decisão: \d{4}-\d{2}-\d{2}$/m.test(body), `${file} deve declarar Data da decisão`);
  assert.ok(/^Depends on: .+$/m.test(body), `${file} deve declarar Depends on`);
  assert.ok(/^Decisor: .+$/m.test(body), `${file} deve declarar Decisor`);
}

const docsReadme = read("docs/README.md");
assert.ok(docsReadme.includes("decisao mais nova substitui automaticamente a antiga"), "docs/README.md deve declarar regra de substituicao por data");

console.log("repo boundary validation ok");
