const test = require("node:test");
const assert = require("node:assert/strict");

const backup = require("../extension/lib/backup.js");
const storage = require("../extension/lib/storage.js");

test("exporta e importa payload valido do produto", () => {
  const item = storage.normalizeItem({
    id: "abc",
    scope: "domain",
    domain: "site.com",
    title: "Teste",
    content: "Conteudo"
  });

  const payload = backup.buildExport([item]);
  const imported = backup.parseImportPayload(JSON.stringify(payload), storage.normalizeItem);

  assert.equal(imported.length, 1);
  assert.equal(imported[0].id, "abc");
});

test("rejeita json invalido e formato desconhecido", () => {
  assert.throws(() => backup.parseImportPayload("{", storage.normalizeItem), /JSON invalido/);
  assert.throws(() => backup.parseImportPayload('{"items":[]}', storage.normalizeItem), /Formato/);
});

test("merge evita duplicacao obvia por id", () => {
  const current = [
    storage.normalizeItem({ id: "a", scope: "global", content: "Atual" })
  ];
  const imported = [
    storage.normalizeItem({ id: "a", scope: "global", content: "Duplicado" }),
    storage.normalizeItem({ id: "b", scope: "global", content: "Novo" })
  ];

  const result = backup.mergeImportedItems(current, imported);

  assert.equal(result.imported, 1);
  assert.equal(result.skipped, 1);
  assert.equal(result.items.length, 2);
});
