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

test("normaliza campos de comando em itens antigos", () => {
  const item = storage.normalizeItem({
    id: "legacy",
    scope: "global",
    title: "Antigo",
    content: "Texto antigo"
  } as any);

  assert.equal(item.commandEnabled, false);
  assert.equal(item.commandTrigger, null);
});

test("salva item com comando normalizado", async () => {
  const local = storage.createMemoryChromeStorage();
  const item = await storage.upsertItem({
    scope: "global",
    title: "Data",
    content: "20/06/2026",
    commandEnabled: true,
    commandTrigger: "/DATA"
  }, local);

  assert.equal(item.commandEnabled, true);
  assert.equal(item.commandTrigger, "/data");
});

test("bloqueia duplicidade e prefixo no mesmo contexto efetivo", async () => {
  const local = storage.createMemoryChromeStorage();
  await storage.upsertItem({
    scope: "global",
    title: "Email",
    content: "a@b.com",
    commandEnabled: true,
    commandTrigger: "/email"
  }, local);

  await assert.rejects(
    () => storage.upsertItem({
      scope: "domain",
      domain: "site.com",
      title: "Email site",
      content: "site@b.com",
      commandEnabled: true,
      commandTrigger: "/email"
    }, local),
    /ja existe/
  );

  await assert.rejects(
    () => storage.upsertItem({
      scope: "domain",
      domain: "site.com",
      title: "Email Syntelix",
      content: "syntelix@b.com",
      commandEnabled: true,
      commandTrigger: "/email-syntelix"
    }, local),
    /conflita/
  );
});
