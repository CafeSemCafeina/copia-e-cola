# Slash Command Expander Implementation Plan

Data da decisão: 2026-06-20
Depends on: docs/superpowers/specs/2026-06-20-slash-command-expander-design.md
Decisor: David Fiocchi

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MVP slash command expander described in `docs/superpowers/specs/2026-06-20-slash-command-expander-design.md`.

**Architecture:** Add pure command and text-expansion libraries, normalize command fields in storage, wire validation into the popup/options composers, and add a thin WXT content script that mutates only supported editable fields. Runtime logic loads commands from local storage and resolves by current domain, while tests cover pure matching plus DOM replacement.

**Tech Stack:** WXT, React 19, TypeScript, Chrome extension APIs, Node `tsx --test`, Playwright smoke script.

---

## File Structure

- Create `src/lib/slash-commands.ts`: pure trigger suggestion, normalization, validation, conflict detection, and per-domain resolution.
- Create `src/lib/text-expansion.ts`: pure suffix match for typed text before the cursor.
- Create `src/lib/dom-expansion.ts`: supported-field detection and DOM mutation helpers used by content script and DOM tests.
- Create `entrypoints/content.ts`: content script listener and storage/domain bridge.
- Modify `src/types.ts`: add `commandEnabled` and `commandTrigger` to `ClipboardItem`.
- Modify `src/lib/storage.ts`: normalize legacy items and validate command conflicts during `upsertItem`/`writeAll`.
- Modify `entrypoints/popup/main.tsx`: command toggle, tooltip, editable trigger, validation errors, save fields.
- Modify `entrypoints/options/main.tsx`: same command editing support for existing items.
- Modify `src/components/index.tsx`: show command badge on cards.
- Modify `src/styles/popup.css` and `src/styles/options.css`: compact field/toggle/tooltip/error styling.
- Modify `wxt.config.ts`: register the content script for normal pages.
- Create `tests/slash-commands.test.ts`: unit coverage for suggestions, validation, conflicts, resolution.
- Create `tests/text-expansion.test.ts`: pure suffix/range tests.
- Create `tests/dom-expansion.test.ts`: jsdom-free DOM tests using a minimal browser-like document is not available in Node, so this file uses a real Playwright page launched from `scripts/content-expansion-smoke.mjs`.
- Create `scripts/content-expansion-smoke.mjs`: local page smoke for input, textarea, contenteditable, unsupported fields, and domain/global behavior.
- Modify `package.json`: add `content:smoke` and include it in `check` after build.

## Task 1: Command Types And Pure Rules

**Files:**
- Modify: `src/types.ts`
- Create: `src/lib/slash-commands.ts`
- Test: `tests/slash-commands.test.ts`

- [ ] **Step 1: Write failing tests for command suggestion and trigger format**

Create `tests/slash-commands.test.ts` with:

```ts
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
```

- [ ] **Step 2: Run the failing test**

Run: `npm run test -- tests/slash-commands.test.ts`

Expected: FAIL because `src/lib/slash-commands.ts` does not exist.

- [ ] **Step 3: Add command fields to `ClipboardItem`**

Update `src/types.ts`:

```ts
export type ItemScope = "domain" | "global";

export type ClipboardItem = {
  id: string;
  scope: ItemScope;
  domain: string | null;
  title: string;
  content: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  lastCopiedAt: string | null;
  commandEnabled: boolean;
  commandTrigger: string | null;
};
```

- [ ] **Step 4: Implement pure command helpers**

Create `src/lib/slash-commands.ts`:

```ts
import type { ClipboardItem } from "../types";

export type CommandValidation = { ok: true } | { ok: false; message: string };

export type CommandConflict = {
  type: "duplicate" | "prefix";
  message: string;
  item: ClipboardItem;
};

export function normalizeCommandTrigger(trigger: string | null | undefined): string {
  return String(trigger || "").trim().toLowerCase();
}

export function suggestCommandTrigger(title: string): string {
  const slug = String(title || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return `/${slug || "comando"}`;
}

export function validateCommandTrigger(trigger: string | null | undefined): CommandValidation {
  const normalized = normalizeCommandTrigger(trigger);
  if (!normalized) return { ok: false, message: "Informe um comando." };
  if (!normalized.startsWith("/")) return { ok: false, message: "O comando deve começar com /." };
  if (normalized === "/") return { ok: false, message: "Digite algo depois da /." };
  if (!/^\/[a-z0-9_-]+$/.test(normalized)) {
    return { ok: false, message: "Use apenas letras, números, _ ou - depois da /." };
  }
  return { ok: true };
}

function contextsOverlap(a: ClipboardItem | Partial<ClipboardItem>, b: ClipboardItem | Partial<ClipboardItem>): boolean {
  const aScope = a.scope === "global" ? "global" : "domain";
  const bScope = b.scope === "global" ? "global" : "domain";
  if (aScope === "global" || bScope === "global") return true;
  return String(a.domain || "").toLowerCase() === String(b.domain || "").toLowerCase();
}

export function commandAppliesToDomain(item: ClipboardItem, domain: string): boolean {
  if (!item.commandEnabled || !item.commandTrigger) return false;
  if (item.scope === "global") return true;
  return item.domain === String(domain || "").toLowerCase();
}

export function applicableCommandItems(items: ClipboardItem[], domain: string): ClipboardItem[] {
  return items.filter((item) => commandAppliesToDomain(item, domain));
}

export function findCommandConflict(candidate: Partial<ClipboardItem>, items: ClipboardItem[]): CommandConflict | null {
  if (!candidate.commandEnabled) return null;

  const validation = validateCommandTrigger(candidate.commandTrigger);
  if (!validation.ok) return null;

  const trigger = normalizeCommandTrigger(candidate.commandTrigger);
  for (const item of items) {
    if (item.id === candidate.id || !item.commandEnabled || !item.commandTrigger) continue;
    if (!contextsOverlap(candidate, item)) continue;

    const existing = normalizeCommandTrigger(item.commandTrigger);
    if (existing === trigger) {
      return { type: "duplicate", item, message: `O comando ${trigger} já existe nesse contexto.` };
    }
    if (existing.startsWith(trigger) || trigger.startsWith(existing)) {
      return { type: "prefix", item, message: `O comando ${trigger} conflita com ${existing}.` };
    }
  }

  return null;
}
```

- [ ] **Step 5: Run the test again**

Run: `npm run test -- tests/slash-commands.test.ts`

Expected: PASS for format tests.

## Task 2: Storage Normalization And Conflict Validation

**Files:**
- Modify: `src/lib/storage.ts`
- Test: `tests/storage.test.ts`, `tests/slash-commands.test.ts`

- [ ] **Step 1: Add failing tests for legacy normalization and conflicts**

Append to `tests/storage.test.ts`:

```ts
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
    /ja existe|já existe/
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
```

Append to `tests/slash-commands.test.ts`:

```ts
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
    normalizeItem({ id: "other", scope: "domain", domain: "other.com", title: "Other", content: "O", commandEnabled: true, commandTrigger: "/o" })
  ];

  assert.deepEqual(applicableCommandItems(items, "site.com").map((item) => item.id).sort(), ["domain", "global"]);
});
```

- [ ] **Step 2: Run tests to verify failures**

Run: `npm run test -- tests/storage.test.ts tests/slash-commands.test.ts`

Expected: FAIL because storage does not normalize command fields yet.

- [ ] **Step 3: Update storage normalization**

In `src/lib/storage.ts`, import helpers:

```ts
import { findCommandConflict, normalizeCommandTrigger, validateCommandTrigger } from "./slash-commands";
```

Inside `normalizeItem`, before the return, add:

```ts
  const commandEnabled = Boolean(input.commandEnabled);
  const commandTrigger = commandEnabled ? normalizeCommandTrigger(input.commandTrigger) : null;
  if (commandEnabled) {
    const validation = validateCommandTrigger(commandTrigger);
    if (!validation.ok) throw new Error(validation.message);
  }
```

Add fields to the returned object:

```ts
    commandEnabled,
    commandTrigger
```

In `writeAll`, normalize once and check every enabled item:

```ts
  const normalized = sortItems(items.map((item) => normalizeItem(item)));
  for (const item of normalized) {
    const conflict = findCommandConflict(item, normalized);
    if (conflict) throw new Error(conflict.message);
  }

  await storage.set({
    [SCHEMA_VERSION_KEY]: SCHEMA_VERSION,
    [STORAGE_KEY]: normalized
  });
```

In `upsertItem`, include existing command fallback:

```ts
    commandEnabled: existing?.commandEnabled,
    commandTrigger: existing?.commandTrigger
```

- [ ] **Step 4: Run storage and command tests**

Run: `npm run test -- tests/storage.test.ts tests/slash-commands.test.ts`

Expected: PASS.

## Task 3: Text Matching And DOM Expansion

**Files:**
- Create: `src/lib/text-expansion.ts`
- Create: `src/lib/dom-expansion.ts`
- Test: `tests/text-expansion.test.ts`

- [ ] **Step 1: Write failing pure text expansion tests**

Create `tests/text-expansion.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { normalizeItem } from "../src/lib/storage";
import { findTextExpansion } from "../src/lib/text-expansion";

const data = normalizeItem({
  id: "data",
  scope: "global",
  title: "Data",
  content: "20/06/2026",
  commandEnabled: true,
  commandTrigger: "/data"
});

test("encontra comando no sufixo do texto antes do cursor", () => {
  assert.deepEqual(findTextExpansion("Hoje e /data", [data]), {
    start: 7,
    end: 12,
    replacement: "20/06/2026",
    itemId: "data"
  });
});

test("ignora comando desconhecido", () => {
  assert.equal(findTextExpansion("Hoje e /hora", [data]), null);
});

test("faz matching case-insensitive", () => {
  assert.equal(findTextExpansion("Hoje e /DATA", [data])?.replacement, "20/06/2026");
});

test("marca somente o comando como range de substituicao", () => {
  const match = findTextExpansion("Ola amigo /data", [data]);
  assert.equal(match?.start, "Ola amigo ".length);
  assert.equal(match?.end, "Ola amigo /data".length);
});
```

- [ ] **Step 2: Run failing test**

Run: `npm run test -- tests/text-expansion.test.ts`

Expected: FAIL because `findTextExpansion` does not exist.

- [ ] **Step 3: Implement pure matcher**

Create `src/lib/text-expansion.ts`:

```ts
import type { ClipboardItem } from "../types";
import { normalizeCommandTrigger } from "./slash-commands";

export type TextExpansionMatch = {
  start: number;
  end: number;
  replacement: string;
  itemId: string;
};

export function findTextExpansion(textBeforeCursor: string, commands: ClipboardItem[]): TextExpansionMatch | null {
  const before = String(textBeforeCursor || "");
  const normalizedBefore = before.toLowerCase();

  for (const item of commands) {
    if (!item.commandEnabled || !item.commandTrigger) continue;
    const trigger = normalizeCommandTrigger(item.commandTrigger);
    if (!normalizedBefore.endsWith(trigger)) continue;

    const start = before.length - trigger.length;
    return {
      start,
      end: before.length,
      replacement: item.content,
      itemId: item.id
    };
  }

  return null;
}
```

- [ ] **Step 4: Implement DOM helpers**

Create `src/lib/dom-expansion.ts`:

```ts
import type { ClipboardItem } from "../types";
import { findTextExpansion } from "./text-expansion";

const SUPPORTED_INPUT_TYPES = new Set(["", "text", "search", "url", "tel"]);

export function isSupportedTextInput(element: Element | null): element is HTMLInputElement | HTMLTextAreaElement {
  if (!element) return false;
  if (element instanceof HTMLTextAreaElement) return !element.readOnly && !element.disabled;
  if (!(element instanceof HTMLInputElement)) return false;
  return SUPPORTED_INPUT_TYPES.has(element.type) && !element.readOnly && !element.disabled;
}

export function expandInInputElement(element: HTMLInputElement | HTMLTextAreaElement, commands: ClipboardItem[]): boolean {
  const start = element.selectionStart;
  const end = element.selectionEnd;
  if (start === null || end === null || start !== end) return false;

  const match = findTextExpansion(element.value.slice(0, start), commands);
  if (!match) return false;

  element.setRangeText(match.replacement, match.start, match.end, "end");
  element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertReplacementText", data: match.replacement }));
  return true;
}

export function expandInContentEditable(element: HTMLElement, commands: ClipboardItem[]): boolean {
  if (!element.isContentEditable) return false;
  const selection = element.ownerDocument.getSelection();
  if (!selection || selection.rangeCount !== 1 || !selection.isCollapsed) return false;

  const range = selection.getRangeAt(0);
  if (!element.contains(range.startContainer) || range.startContainer.nodeType !== Node.TEXT_NODE) return false;

  const textNode = range.startContainer;
  const before = String(textNode.textContent || "").slice(0, range.startOffset);
  const match = findTextExpansion(before, commands);
  if (!match) return false;

  const replaceRange = element.ownerDocument.createRange();
  replaceRange.setStart(textNode, match.start);
  replaceRange.setEnd(textNode, match.end);
  replaceRange.deleteContents();
  replaceRange.insertNode(element.ownerDocument.createTextNode(match.replacement));
  replaceRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(replaceRange);
  element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertReplacementText", data: match.replacement }));
  return true;
}

export function expandInEditableTarget(target: EventTarget | null, commands: ClipboardItem[]): boolean {
  if (!(target instanceof Element)) return false;
  if (isSupportedTextInput(target)) return expandInInputElement(target, commands);
  const editable = target.closest<HTMLElement>("[contenteditable=''], [contenteditable='true']");
  if (editable) return expandInContentEditable(editable, commands);
  return false;
}
```

- [ ] **Step 5: Run pure tests**

Run: `npm run test -- tests/text-expansion.test.ts`

Expected: PASS.

## Task 4: Content Script Runtime

**Files:**
- Create: `entrypoints/content.ts`
- Modify: `wxt.config.ts`
- Create: `scripts/content-expansion-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Register content script in WXT config**

In `wxt.config.ts`, add host permissions and content script config:

```ts
    host_permissions: ["<all_urls>"],
```

Create `entrypoints/content.ts` so WXT discovers the entrypoint.

- [ ] **Step 2: Implement content script**

Create `entrypoints/content.ts`:

```ts
import { domainFromUrl } from "../src/lib/domain";
import { expandInEditableTarget } from "../src/lib/dom-expansion";
import { applicableCommandItems } from "../src/lib/slash-commands";
import { readAll } from "../src/lib/storage";
import type { ClipboardItem } from "../src/types";

let cachedCommands: ClipboardItem[] = [];
let cachedAt = 0;
const CACHE_MS = 1500;

async function loadCommands(): Promise<ClipboardItem[]> {
  const now = Date.now();
  if (now - cachedAt < CACHE_MS) return cachedCommands;

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
    // Runtime expansion must never break normal typing.
  }
}, true);

chrome.storage?.onChanged?.addListener(() => {
  cachedCommands = [];
  cachedAt = 0;
});
```

- [ ] **Step 3: Add focused smoke script**

Create `scripts/content-expansion-smoke.mjs` that builds the extension, launches Chrome with `dist`, preloads `copiaEColaItems` in extension storage, opens a local HTML page containing `input`, `textarea`, `contenteditable`, `password`, `readonly`, and `disabled` fields, types `/data`, `/email`, `/oi`, and verifies replacement plus no mutation for unsupported fields.

- [ ] **Step 4: Wire smoke into package scripts**

Modify `package.json`:

```json
"content:smoke": "node scripts/content-expansion-smoke.mjs",
"check": "npm run test && npm run build && npm run validate && npm run validate:publication && npm run validate:boundaries && npm run content:smoke"
```

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: PASS and `dist/content-scripts/content.js` exists.

## Task 5: Popup Command UI

**Files:**
- Modify: `entrypoints/popup/main.tsx`
- Modify: `src/styles/popup.css`

- [ ] **Step 1: Add command state and validation**

In popup state add:

```ts
const [commandEnabled, setCommandEnabled] = useState(false);
const [commandTrigger, setCommandTrigger] = useState("");
const [commandError, setCommandError] = useState("");
```

In `openComposer`, load fields:

```ts
setCommandEnabled(Boolean(item?.commandEnabled));
setCommandTrigger(item?.commandTrigger || "");
```

In `closeComposer`, reset fields:

```ts
setCommandEnabled(false);
setCommandTrigger("");
setCommandError("");
```

When enabling command mode, use `suggestCommandTrigger(title || storage.makeTitle(content))` if the field is empty.

- [ ] **Step 2: Validate before save**

In `submit`, before `storage.upsertItem`, call `storage.normalizeItem` with the candidate plus `commandEnabled` and `commandTrigger`; catch thrown errors and render as `commandError`. The actual save remains `storage.upsertItem`.

- [ ] **Step 3: Render toggle, tooltip, and field**

Inside the composer after global checkbox, render:

```tsx
<label className="checkbox-row command-toggle">
  <input id="command-enabled-input" type="checkbox" checked={commandEnabled} onChange={(event) => {
    const checked = event.currentTarget.checked;
    setCommandEnabled(checked);
    if (checked && !commandTrigger.trim()) setCommandTrigger(suggestCommandTrigger(title || storage.makeTitle(content)));
  }} />
  <span>Usar como comando</span>
  <span className="command-help" tabIndex={0}>?
    <span className="command-tooltip">Quando você digitar este comando em um campo de texto, ele será trocado pelo conteúdo salvo.</span>
  </span>
</label>
{commandEnabled ? (
  <label className="field">
    <span>Comando</span>
    <input id="command-trigger-input" value={commandTrigger} maxLength={60} placeholder="/meu-comando" onChange={(event) => setCommandTrigger(event.currentTarget.value)} />
    {commandError ? <small className="field-error">{commandError}</small> : null}
  </label>
) : null}
```

- [ ] **Step 4: Add compact CSS**

Add to `src/styles/popup.css`:

```css
.command-toggle { position: relative; }
.command-help { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 999px; background: var(--surface-muted); color: var(--text-muted); font-size: 12px; cursor: help; }
.command-tooltip { display: none; position: absolute; left: 0; top: 28px; z-index: 5; width: 260px; padding: 8px 10px; border: 1px solid var(--border-subtle); border-radius: 8px; background: var(--surface); color: var(--text); box-shadow: var(--shadow-popover); }
.command-help:hover .command-tooltip, .command-help:focus .command-tooltip { display: block; }
.field-error { color: var(--danger); font-size: 12px; }
```

- [ ] **Step 5: Run tests and build**

Run: `npm run test && npm run build`

Expected: PASS.

## Task 6: Options Command UI And Card Badge

**Files:**
- Modify: `entrypoints/options/main.tsx`
- Modify: `src/components/index.tsx`
- Modify: `src/styles/options.css`

- [ ] **Step 1: Mirror command editor in options**

Add the same `commandEnabled`, `commandTrigger`, `commandError` state and save payload to `entrypoints/options/main.tsx`. Since options only edits existing items, use `editing.domain` for domain-scoped items and keep the global checkbox behavior unchanged.

- [ ] **Step 2: Show command badge on cards**

In `ClipboardItemCard`, after the global badge, render:

```tsx
{item.commandEnabled && item.commandTrigger ? <Badge tone="amber" mono>{item.commandTrigger}</Badge> : null}
```

- [ ] **Step 3: Add options CSS**

Add the same `.command-toggle`, `.command-help`, `.command-tooltip`, and `.field-error` classes to `src/styles/options.css`, adjusted to existing variables if needed.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: PASS.

## Task 7: Full Verification

**Files:**
- Modify: `scripts/chrome-smoke.mjs` if needed to save one command-enabled item from popup.

- [ ] **Step 1: Extend existing Chrome smoke for UI command save**

Update `saveItem` in `scripts/chrome-smoke.mjs` to accept an optional command trigger. When provided, check `#command-enabled-input`, fill `#command-trigger-input`, save, and verify the card badge contains the trigger.

- [ ] **Step 2: Run unit tests**

Run: `npm run test`

Expected: PASS for all `tests/*.test.ts`.

- [ ] **Step 3: Run full gate**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 4: Commit implementation**

Run:

```powershell
git add src entrypoints tests scripts package.json package-lock.json wxt.config.ts docs/superpowers/plans/2026-06-20-slash-command-expander-implementation.md
git commit -m "feat: add slash command expander"
```

Expected: commit succeeds with conventional commit message.

## Self-Review

- Spec coverage: plan covers data model, UI toggle/tooltip/field, format validation, exact and prefix conflict blocking, domain/global resolution, input/textarea/contenteditable replacement, unsupported fields, and tests.
- Placeholder scan: no task uses TBD/TODO/fill-in placeholders as the implementation instruction; the only flexible point is the smoke script details, bounded by explicit fields and assertions.
- Type consistency: all tasks use `commandEnabled`, `commandTrigger`, `suggestCommandTrigger`, `normalizeCommandTrigger`, `validateCommandTrigger`, `findCommandConflict`, `applicableCommandItems`, and `findTextExpansion` consistently.
