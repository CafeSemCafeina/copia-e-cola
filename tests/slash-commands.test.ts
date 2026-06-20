import test from "node:test";
import assert from "node:assert/strict";
import { normalizeItem } from "../src/lib/storage";
import {
  applicableCommandItems,
  findCommandConflict,
  normalizeCommandTrigger,
  suggestCommandTrigger,
  validateCommandTrigger
} from "../src/lib/slash-commands";

test("sugere comando slugificado a partir do titulo", () => {
  assert.equal(suggestCommandTrigger("Data de hoje"), "/data-de-hoje");
  assert.equal(suggestCommandTrigger("  E-mail Syntelix!! "), "/e-mail-syntelix");
  assert.equal(suggestCommandTrigger(""), "/comando");
});

test("normaliza gatilhos para comparacao case-insensitive", () => {
  assert.equal(normalizeCommandTrigger("/Email_Syntelix"), "/email_syntelix");
});

test("valida formato de gatilho", () => {
  assert.deepEqual(validateCommandTrigger("/data"), { ok: true });
  assert.deepEqual(validateCommandTrigger("/email_syntelix"), { ok: true });
  assert.deepEqual(validateCommandTrigger("/email-syntelix"), { ok: true });
  assert.equal(validateCommandTrigger("/").ok, false);
  assert.equal(validateCommandTrigger("data").ok, false);
  assert.equal(validateCommandTrigger("/email syntelix").ok, false);
  assert.equal(validateCommandTrigger("/email!").ok, false);
});

test("detecta duplicidade e prefixo no mesmo contexto efetivo", () => {
  const global = normalizeItem({
    id: "global",
    scope: "global",
    title: "Email",
    content: "a@b.com",
    commandEnabled: true,
    commandTrigger: "/email"
  });

  const duplicate = normalizeItem({
    id: "duplicate",
    scope: "domain",
    domain: "site.com",
    title: "Email Site",
    content: "site@b.com",
    commandEnabled: true,
    commandTrigger: "/email"
  });

  const prefix = normalizeItem({
    id: "prefix",
    scope: "domain",
    domain: "site.com",
    title: "Email Syntelix",
    content: "syntelix@b.com",
    commandEnabled: true,
    commandTrigger: "/email-syntelix"
  });

  assert.equal(findCommandConflict(duplicate, [global])?.type, "duplicate");
  assert.equal(findCommandConflict(prefix, [global])?.type, "prefix");
  assert.equal(findCommandConflict(global, [prefix])?.type, "prefix");
});

test("permite mesmo comando em dominios diferentes sem global", () => {
  const a = normalizeItem({
    id: "a",
    scope: "domain",
    domain: "a.com",
    title: "Docs",
    content: "A",
    commandEnabled: true,
    commandTrigger: "/docs"
  });
  const candidate = normalizeItem({
    id: "b",
    scope: "domain",
    domain: "b.com",
    title: "Docs",
    content: "B",
    commandEnabled: true,
    commandTrigger: "/docs"
  });

  assert.equal(findCommandConflict(candidate, [a]), null);
});

test("resolve comandos aplicaveis para dominio", () => {
  const items = [
    normalizeItem({ id: "global", scope: "global", title: "Global", content: "G", commandEnabled: true, commandTrigger: "/g" }),
    normalizeItem({ id: "domain", scope: "domain", domain: "site.com", title: "Site", content: "S", commandEnabled: true, commandTrigger: "/s" }),
    normalizeItem({ id: "other", scope: "domain", domain: "other.com", title: "Other", content: "O", commandEnabled: true, commandTrigger: "/o" }),
    normalizeItem({ id: "disabled", scope: "global", title: "Disabled", content: "D" })
  ];

  assert.deepEqual(applicableCommandItems(items, "site.com").map((item) => item.id).sort(), ["domain", "global"]);
});
