import assert from "node:assert/strict";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const extensionDir = resolve("dist");

function browserCandidates() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files\\Google\\Chrome for Testing\\Application\\chrome.exe",
    "C:\\Program Files\\Chromium\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);

  const playwrightRoot = join(process.env.LOCALAPPDATA || "", "ms-playwright");
  if (existsSync(playwrightRoot)) {
    for (const name of readdirSync(playwrightRoot).sort().reverse()) {
      const exe = join(playwrightRoot, name, "chrome-win64", "chrome.exe");
      if (existsSync(exe)) candidates.push(exe);
    }
  }

  return [...new Set(candidates)].filter((candidate) => existsSync(candidate));
}

function removeProfile(path) {
  try {
    rmSync(path, { recursive: true, force: true, maxRetries: 10, retryDelay: 250 });
  } catch (error) {
    console.warn(`Aviso: nao foi possivel remover perfil temporario ${path}: ${error.message}`);
  }
}

async function extensionIdFromManager(page) {
  await page.goto("chrome://extensions/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  return page.evaluate(() => {
    const manager = document.querySelector("extensions-manager");
    const root = manager && manager.shadowRoot;
    const itemList = root && root.querySelector("extensions-item-list") && root.querySelector("extensions-item-list").shadowRoot;
    const items = Array.from((itemList && itemList.querySelectorAll("extensions-item")) || []);
    const item = items.find((candidate) => {
      const text = candidate.shadowRoot ? candidate.shadowRoot.textContent || "" : "";
      return text.includes("Copia e Cola");
    });

    return item ? item.getAttribute("id") : null;
  });
}

async function launchWithExtension(executablePath) {
  const userDataDir = mkdtempSync(join(tmpdir(), "copia-e-cola-content-pw-"));
  const context = await chromium.launchPersistentContext(userDataDir, {
    executablePath,
    headless: false,
    args: [
      `--disable-extensions-except=${extensionDir}`,
      `--load-extension=${extensionDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-sync",
      "--window-position=-32000,-32000",
      "--window-size=900,700"
    ]
  });

  return { context, userDataDir };
}

async function findWorkingBrowser() {
  const failures = [];

  for (const executablePath of browserCandidates()) {
    let launched;
    try {
      launched = await launchWithExtension(executablePath);
      const page = await launched.context.newPage();
      const extensionId = await extensionIdFromManager(page);
      await page.close();

      if (extensionId) return { ...launched, executablePath, extensionId };
      failures.push(`${executablePath}: extensao nao listada`);
    } catch (error) {
      failures.push(`${executablePath}: ${error.message}`);
    }

    if (launched) {
      await launched.context.close();
      removeProfile(launched.userDataDir);
    }
  }

  throw new Error(`Nenhum browser local carregou a extensao.\n${failures.join("\n")}`);
}

function startServer() {
  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>content expansion smoke</title></head>
  <body>
    <input id="text-input" type="text" />
    <input id="password-input" type="password" />
    <input id="readonly-input" type="text" readonly />
    <input id="disabled-input" type="text" disabled />
    <textarea id="textarea"></textarea>
    <div id="editable" contenteditable="true" style="min-height: 40px"></div>
    <script>
      window.inputEvents = {};
      for (const id of ["text-input", "password-input", "readonly-input", "disabled-input", "textarea", "editable"]) {
        document.getElementById(id).addEventListener("input", () => {
          window.inputEvents[id] = (window.inputEvents[id] || 0) + 1;
        });
      }
    </script>
  </body>
</html>`;

  const server = createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(html);
  });

  return new Promise((resolvePromise, rejectPromise) => {
    server.once("error", rejectPromise);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolvePromise({ server, url: `http://127.0.0.1:${address.port}/` });
    });
  });
}

function item(id, scope, domain, title, content, commandTrigger) {
  const now = new Date().toISOString();
  return {
    id,
    scope,
    domain,
    title,
    content,
    favorite: false,
    createdAt: now,
    updatedAt: now,
    lastCopiedAt: null,
    commandEnabled: true,
    commandTrigger
  };
}

let launched;
let localServer;

try {
  localServer = await startServer();
  launched = await findWorkingBrowser();
  const { context, extensionId, executablePath } = launched;
  const extensionPage = await context.newPage();
  await extensionPage.goto(`chrome-extension://${extensionId}/popup.html?activeUrl=${encodeURIComponent(localServer.url)}`, { waitUntil: "domcontentloaded" });
  await extensionPage.evaluate((items) => chrome.storage.local.set({ copiaEColaSchemaVersion: 1, copiaEColaItems: items }), [
    item("global-data", "global", null, "Data", "20/06/2026", "/data"),
    item("domain-email", "domain", "127.0.0.1", "Email", "contato@empresa.com", "/email"),
    item("domain-oi", "domain", "127.0.0.1", "Oi", "Olá, tudo bem?", "/oi"),
    item("other-domain", "domain", "example.com", "Outro", "NAO DEVE ENTRAR", "/outro")
  ]);
  await extensionPage.close();

  const page = await context.newPage();
  await page.goto(localServer.url, { waitUntil: "domcontentloaded" });

  await page.locator("#text-input").fill("Contato: ");
  await page.locator("#text-input").type("/email");
  await page.waitForFunction(() => document.getElementById("text-input").value === "Contato: contato@empresa.com");
  assert.equal(await page.locator("#text-input").inputValue(), "Contato: contato@empresa.com");

  await page.locator("#textarea").fill("Hoje e ");
  await page.locator("#textarea").type("/data");
  await page.waitForFunction(() => document.getElementById("textarea").value === "Hoje e 20/06/2026");
  assert.equal(await page.locator("#textarea").inputValue(), "Hoje e 20/06/2026");

  await page.locator("#text-input").fill("Antes  depois");
  await page.locator("#text-input").evaluate((element) => element.setSelectionRange(6, 6));
  await page.locator("#text-input").type("/data");
  await page.waitForFunction(() => document.getElementById("text-input").value === "Antes 20/06/2026 depois");
  assert.equal(await page.locator("#text-input").inputValue(), "Antes 20/06/2026 depois");

  await page.locator("#editable").click();
  await page.keyboard.type("Ola /oi");
  await page.waitForFunction(() => document.getElementById("editable").textContent === "Ola Olá, tudo bem?");
  assert.equal(await page.locator("#editable").textContent(), "Ola Olá, tudo bem?");

  await page.locator("#password-input").fill("/data");
  assert.equal(await page.locator("#password-input").inputValue(), "/data");

  await page.locator("#readonly-input").evaluate((element) => {
    element.removeAttribute("readonly");
    element.value = "/data";
    element.setAttribute("readonly", "");
  });
  assert.equal(await page.locator("#readonly-input").inputValue(), "/data");

  await page.locator("#disabled-input").evaluate((element) => {
    element.removeAttribute("disabled");
    element.value = "/data";
    element.setAttribute("disabled", "");
  });
  assert.equal(await page.locator("#disabled-input").inputValue(), "/data");

  await page.locator("#textarea").fill("Outro ");
  await page.locator("#textarea").type("/outro");
  assert.equal(await page.locator("#textarea").inputValue(), "Outro /outro");

  const inputEvents = await page.evaluate(() => window.inputEvents);
  assert.ok(inputEvents["text-input"] >= 2, "input deve receber eventos depois da substituicao");
  assert.ok(inputEvents.textarea >= 2, "textarea deve receber eventos depois da substituicao");
  assert.ok(inputEvents.editable >= 2, "contenteditable deve receber eventos depois da substituicao");

  console.log(`content expansion smoke ok (${extensionId}) via ${executablePath}`);
} finally {
  if (launched) {
    await launched.context.close();
    removeProfile(launched.userDataDir);
  }
  if (localServer) {
    await new Promise((resolvePromise) => localServer.server.close(resolvePromise));
  }
}
