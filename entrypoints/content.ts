import { domainFromUrl } from "../src/lib/domain";
import { expandInEditableTarget } from "../src/lib/dom-expansion";
import { applicableCommandItems } from "../src/lib/slash-commands";
import { readAll } from "../src/lib/storage";
import type { ClipboardItem } from "../src/types";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    let cachedCommands: ClipboardItem[] = [];
    let cachedAt = 0;
    const cacheMs = 1500;

    async function loadCommands(): Promise<ClipboardItem[]> {
      const now = Date.now();
      if (now - cachedAt < cacheMs) return cachedCommands;

      const domain = domainFromUrl(window.location.href);
      if (!domain) return [];

      const items = await readAll();
      cachedCommands = applicableCommandItems(items, domain);
      cachedAt = now;
      return cachedCommands;
    }

    document.addEventListener("input", async (event) => {
      if (!(event instanceof InputEvent) || event.inputType === "insertReplacementText") return;
      try {
        const commands = await loadCommands();
        if (commands.length) expandInEditableTarget(event.target, commands);
      } catch {
        // Runtime expansion must not interrupt normal typing.
      }
    }, true);

    chrome.storage?.onChanged?.addListener(() => {
      cachedCommands = [];
      cachedAt = 0;
    });
  }
});
