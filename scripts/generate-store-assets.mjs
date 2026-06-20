import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const root = process.cwd();
const designPath = resolve(root, "design-system", "screens", "telas-da-extensao.html");
const screenshotsDir = resolve(root, "store", "screenshots");
const promoDir = resolve(root, "store", "promotional");

async function browserCandidates() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);

  const playwrightRoot = join(process.env.LOCALAPPDATA || "", "ms-playwright");
  if (existsSync(playwrightRoot)) {
    const { readdirSync } = await import("node:fs");
    for (const name of readdirSync(playwrightRoot).sort().reverse()) {
      const exe = join(playwrightRoot, name, "chrome-win64", "chrome.exe");
      if (existsSync(exe)) {
        candidates.push(exe);
      }
    }
  }

  return [...new Set(candidates)].filter((candidate) => candidate && existsSync(candidate));
}

async function launchBrowser() {
  for (const executablePath of await browserCandidates()) {
    try {
      const browser = await chromium.launch({ executablePath, headless: true });
      return browser;
    } catch {
      // Try the next local browser.
    }
  }

  return chromium.launch({ headless: true });
}

async function screenshotAsset(page, target, outputPath) {
  const handle = await page.evaluateHandle(({ width, height, text }) => {
    const candidates = Array.from(document.querySelectorAll("div")).filter((node) => {
      const rect = node.getBoundingClientRect();
      const nodeText = node.textContent || "";
      return Math.round(rect.width) === width
        && Math.round(rect.height) === height
        && (!text || nodeText.includes(text));
    });

    return candidates[0] || null;
  }, target);

  const element = handle.asElement();
  if (!element) {
    throw new Error(`Asset nao encontrado no design: ${target.text || `${target.width}x${target.height}`}`);
  }

  await element.scrollIntoViewIfNeeded();
  const box = await element.boundingBox();
  if (!box) {
    throw new Error(`Asset sem bounding box: ${target.text || `${target.width}x${target.height}`}`);
  }

  await page.screenshot({
    path: outputPath,
    clip: {
      x: box.x,
      y: box.y,
      width: target.width,
      height: target.height
    }
  });
}

mkdirSync(screenshotsDir, { recursive: true });
mkdirSync(promoDir, { recursive: true });

const browser = await launchBrowser();
const page = await browser.newPage({ viewport: { width: 1500, height: 950 }, deviceScaleFactor: 1 });

try {
  await page.goto(`file:///${designPath.replaceAll("\\", "/")}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.body.innerText.includes("Cada site, só os textos certos"), null, { timeout: 15000 });
  await page.waitForTimeout(1200);

  await screenshotAsset(page, { width: 1280, height: 800, text: "Cada site, só os textos certos" }, join(screenshotsDir, "contexto-por-site-1280x800.png"));
  await screenshotAsset(page, { width: 1280, height: 800, text: "Cole uma vez. Reutilize sempre" }, join(screenshotsDir, "salvar-e-reutilizar-1280x800.png"));
  await screenshotAsset(page, { width: 1280, height: 800, text: "Seus dados ficam no seu navegador" }, join(screenshotsDir, "local-first-1280x800.png"));
  await screenshotAsset(page, { width: 440, height: 280, text: "Sua área de transferência" }, join(promoDir, "small-tile-440x280.png"));
  await screenshotAsset(page, { width: 1440, height: 560, text: "Copie menos. Cole melhor." }, join(promoDir, "marquee-1440x560.png"));

  console.log("store assets generated");
} finally {
  await browser.close();
}
