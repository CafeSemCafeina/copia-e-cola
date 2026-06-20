import test from "node:test";
import assert from "node:assert/strict";
import * as storage from "../src/lib/storage";

test("salva e lista itens por dominio sem misturar contextos", async () => {
  const local = storage.createMemoryChromeStorage();

  await storage.upsertItem({
    scope: "domain",
    domain: "web.whatsapp.com",
    title: "",
    content: "Mensagem do WhatsApp"
  }, local);

  await storage.upsertItem({
    scope: "domain",
    domain: "portal.teste.gov.br",
    title: "Portal",
    content: "Mensagem do portal"
  }, local);

  await storage.upsertItem({
    scope: "global",
    domain: null,
    title: "Global",
    content: "Mensagem global"
  }, local);

  const whatsapp = await storage.listForDomain("web.whatsapp.com", local);
  assert.equal(whatsapp.domainItems.length, 1);
  assert.equal(whatsapp.domainItems[0].content, "Mensagem do WhatsApp");
  assert.equal(whatsapp.globalItems.length, 1);

  const portal = await storage.listForDomain("portal.teste.gov.br", local);
  assert.equal(portal.domainItems.length, 1);
  assert.equal(portal.domainItems[0].content, "Mensagem do portal");
});

test("recusa conteudo vazio", async () => {
  const local = storage.createMemoryChromeStorage();

  await assert.rejects(
    () => storage.upsertItem({ scope: "domain", domain: "site.com", content: " " }, local),
    /Conteudo vazio/
  );
});

test("edita, favorita, copia e exclui item", async () => {
  const local = storage.createMemoryChromeStorage();
  const created = await storage.upsertItem({
    scope: "domain",
    domain: "site.com",
    title: "Inicial",
    content: "Texto"
  }, local);

  const updated = await storage.upsertItem({
    id: created.id,
    scope: "domain",
    domain: "site.com",
    title: "Editado",
    content: "Texto editado"
  }, local);
  assert.equal(updated.createdAt, created.createdAt);
  assert.equal(updated.title, "Editado");

  const favorite = await storage.toggleFavorite(created.id, local);
  assert.equal(favorite?.favorite, true);

  const copiedAt = await storage.markCopied(created.id, local);
  const all = await storage.readAll(local);
  assert.equal(all[0].lastCopiedAt, copiedAt);

  const removed = await storage.deleteItem(created.id, local);
  assert.equal(removed, true);
  assert.equal((await storage.readAll(local)).length, 0);
});
