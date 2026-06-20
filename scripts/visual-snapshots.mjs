import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const outputDir = resolve("output", "playwright");

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
      return chromium.launch({ executablePath, headless: true });
    } catch {
      // Try the next browser.
    }
  }

  return chromium.launch({ headless: true });
}

function fileUrl(path) {
  return `file:///${resolve(path).replaceAll("\\", "/")}`;
}

function contentType(pathname) {
  if (pathname.endsWith(".html")) return "text/html; charset=utf-8";
  if (pathname.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".woff2")) return "font/woff2";
  if (pathname.endsWith(".woff")) return "font/woff";
  return "application/octet-stream";
}

async function serveDir(dir) {
  const { readFile } = await import("node:fs/promises");
  const root = resolve(dir);
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/popup.html" : url.pathname);
      const target = resolve(root, pathname.slice(1));

      if (!target.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const body = await readFile(target);
      response.writeHead(200, { "Content-Type": contentType(target) });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolveClose) => server.close(resolveClose))
  };
}

async function screenshotPopup(page, path) {
  const shell = page.locator(".popup-shell");
  await shell.waitFor({ state: "visible" });
  await shell.screenshot({ path });
}

mkdirSync(outputDir, { recursive: true });

const browser = await launchBrowser();
const distServer = await serveDir("dist");

try {
  const reference = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await reference.goto(fileUrl("design-system/screens/telas-da-extensao.html"), { waitUntil: "domcontentloaded" });
  await reference.waitForTimeout(1200);
  await reference.screenshot({ path: join(outputDir, "reference-design.png"), fullPage: false });
  await reference.close();

  const popup = await browser.newPage({ viewport: { width: 360, height: 600 }, deviceScaleFactor: 1 });
  await popup.goto(`${distServer.origin}/popup.html?activeUrl=https%3A%2F%2Fweb.whatsapp.com%2F`, { waitUntil: "domcontentloaded" });
  await popup.waitForTimeout(800);
  await screenshotPopup(popup, join(outputDir, "popup-empty.png"));
  await popup.close();

  const popupList = await browser.newPage({ viewport: { width: 360, height: 600 }, deviceScaleFactor: 1 });
  await popupList.goto(`${distServer.origin}/popup.html?fixture=design&activeUrl=https%3A%2F%2Fweb.whatsapp.com%2F`, { waitUntil: "domcontentloaded" });
  await popupList.waitForTimeout(800);
  await screenshotPopup(popupList, join(outputDir, "popup-list.png"));
  await popupList.close();

  const welcome = await browser.newPage({ viewport: { width: 980, height: 740 }, deviceScaleFactor: 1 });
  await welcome.goto(`${distServer.origin}/welcome.html`, { waitUntil: "domcontentloaded" });
  await welcome.screenshot({ path: join(outputDir, "welcome.png"), fullPage: false });
  await welcome.close();

  const options = await browser.newPage({ viewport: { width: 1080, height: 860 }, deviceScaleFactor: 1 });
  await options.goto(`${distServer.origin}/options.html?fixture=design`, { waitUntil: "domcontentloaded" });
  await options.waitForTimeout(800);
  await options.screenshot({ path: join(outputDir, "options.png"), fullPage: false });
  await options.close();

  const landing = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await landing.goto(fileUrl("site/index.html"), { waitUntil: "domcontentloaded" });
  await landing.screenshot({ path: join(outputDir, "landing.png"), fullPage: true });
  await landing.setViewportSize({ width: 390, height: 900 });
  await landing.screenshot({ path: join(outputDir, "landing-mobile.png"), fullPage: true });
  await landing.close();

  console.log(`visual snapshots generated in ${outputDir}`);
} finally {
  await distServer.close();
  await browser.close();
}
