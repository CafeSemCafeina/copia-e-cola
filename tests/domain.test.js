const test = require("node:test");
const assert = require("node:assert/strict");

const { domainFromUrl, normalizeHostname } = require("../extension/lib/domain.js");

test("normaliza dominio removendo www e caixa alta", () => {
  assert.equal(normalizeHostname("WWW.Google.COM."), "google.com");
});

test("mantem subdominio util como contexto", () => {
  assert.equal(domainFromUrl("https://web.whatsapp.com/"), "web.whatsapp.com");
});

test("normaliza busca do google para dominio base", () => {
  assert.equal(domainFromUrl("https://www.google.com/search?q=x"), "google.com");
});

test("trata paginas internas como nao suportadas", () => {
  assert.equal(domainFromUrl("chrome://extensions"), null);
  assert.equal(domainFromUrl("about:blank"), null);
  assert.equal(domainFromUrl("file:///C:/tmp/test.html"), null);
});
