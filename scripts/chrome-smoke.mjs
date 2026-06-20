import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const extensionDir = resolve("extension");

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
      if (existsSync(exe)) {
        candidates.push(exe);
      }
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
  await page.waitForTimeout(1500);

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
  const userDataDir = mkdtempSync(join(tmpdir(), "copia-e-cola-pw-"));
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
      "--window-size=420,680"
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

      if (extensionId) {
        return { ...launched, executablePath, extensionId };
      }

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

async function openPopup(context, extensionId, activeUrl) {
  const popup = await context.newPage();
  const popupUrl = `chrome-extension://${extensionId}/popup/popup.html?activeUrl=${encodeURIComponent(activeUrl)}`;
  await popup.goto(popupUrl, { waitUntil: "domcontentloaded" });
  await popup.waitForSelector("#app-content:not([hidden])", { timeout: 5000 });
  return popup;
}

async function saveItem(page, title, content, global = false) {
  await page.locator("#title-input").fill(title);
  await page.locator("#content-input").fill(content);

  if (global) {
    await page.locator("#global-input").check();
  }

  await page.getByRole("button", { name: "Salvar" }).click();
  await page.getByText("Item salvo.").waitFor();
  await page.locator(".clipboard-item__title", { hasText: title }).waitFor();
}

let launched;
let importLaunched;
let exportDir;

try {
  launched = await findWorkingBrowser();
  const { context, executablePath, extensionId } = launched;

  const popup = await openPopup(context, extensionId, "https://web.whatsapp.com/");
  assert.equal(await popup.title(), "Copia e Cola");
  await assert.doesNotReject(() => popup.getByRole("heading", { name: "web.whatsapp.com" }).waitFor());

  await saveItem(popup, "Saudação WhatsApp", "Olá! Já vou te ajudar por aqui.");
  await popup.reload({ waitUntil: "domcontentloaded" });
  await popup.locator(".clipboard-item__title", { hasText: "Saudação WhatsApp" }).waitFor();

  const otherDomain = await openPopup(context, extensionId, "https://portal-juridico.example.test/processos");
  await otherDomain.getByText("Nenhum item salvo para este site ainda.").waitFor();
  assert.equal(await otherDomain.locator(".clipboard-item__title", { hasText: "Saudação WhatsApp" }).count(), 0);
  await saveItem(otherDomain, "Portal jurídico", "Texto restrito ao portal jurídico.");

  const syntelixDomain = await openPopup(context, extensionId, "https://app.syntelix.com/operacao");
  await syntelixDomain.getByText("Nenhum item salvo para este site ainda.").waitFor();
  assert.equal(await syntelixDomain.locator(".clipboard-item__title", { hasText: "Saudação WhatsApp" }).count(), 0);
  assert.equal(await syntelixDomain.locator(".clipboard-item__title", { hasText: "Portal jurídico" }).count(), 0);
  await saveItem(syntelixDomain, "Ferramenta Syntelix", "Texto restrito à ferramenta Syntelix.");

  await saveItem(otherDomain, "Item global", "Texto reutilizável em qualquer site.", true);

  await popup.reload({ waitUntil: "domcontentloaded" });
  await popup.locator(".clipboard-item__title", { hasText: "Item global" }).waitFor();
  assert.equal(await popup.locator(".clipboard-item__title", { hasText: "Portal jurídico" }).count(), 0);
  assert.equal(await popup.locator(".clipboard-item__title", { hasText: "Ferramenta Syntelix" }).count(), 0);

  await popup.locator("#backup-toggle").click();
  const downloadPromise = popup.waitForEvent("download");
  await popup.getByRole("button", { name: "Exportar JSON" }).click();
  const download = await downloadPromise;
  exportDir = mkdtempSync(join(tmpdir(), "copia-e-cola-export-"));
  const exportPath = join(exportDir, "backup.json");
  await download.saveAs(exportPath);

  const exported = JSON.parse(readFileSync(exportPath, "utf8"));
  assert.equal(exported.product, "copia-e-cola");
  assert.ok(exported.items.length >= 4, "backup deve conter os itens criados no smoke");

  importLaunched = await launchWithExtension(executablePath);
  const importPage = await importLaunched.context.newPage();
  const importExtensionId = await extensionIdFromManager(importPage);
  await importPage.close();
  assert.ok(importExtensionId, "extensao nao carregou no perfil limpo de importacao");

  const cleanPopup = await openPopup(importLaunched.context, importExtensionId, "https://web.whatsapp.com/");
  await cleanPopup.getByText("Nenhum item salvo para este site ainda.").waitFor();
  await cleanPopup.locator("#backup-toggle").click();
  await cleanPopup.locator("#import-input").setInputFiles(exportPath);
  await cleanPopup.getByText(/itens importados/).waitFor();
  await cleanPopup.locator(".clipboard-item__title", { hasText: "Saudação WhatsApp" }).waitFor();
  await cleanPopup.locator(".clipboard-item__title", { hasText: "Item global" }).waitFor();

  console.log(`chrome smoke ok (${extensionId}) via ${executablePath}`);
} finally {
  if (importLaunched) {
    await importLaunched.context.close();
    removeProfile(importLaunched.userDataDir);
  }

  if (launched) {
    await launched.context.close();
    removeProfile(launched.userDataDir);
  }

  if (exportDir) {
    removeProfile(exportDir);
  }
}
