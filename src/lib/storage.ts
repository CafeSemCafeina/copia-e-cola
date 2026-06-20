import type { ClipboardItem } from "../types";

export const STORAGE_KEY = "copiaEColaItems";
export const SCHEMA_VERSION_KEY = "copiaEColaSchemaVersion";
export const SCHEMA_VERSION = 1;

type LocalStorageArea = Pick<chrome.storage.StorageArea, "get" | "set">;

export function nowIso(): string {
  return new Date().toISOString();
}

export function generateId(): string {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `item_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function makeTitle(content: string): string {
  return String(content || "").trim().replace(/\s+/g, " ").slice(0, 48) || "Sem titulo";
}

export function normalizeItem(input: Partial<ClipboardItem>, fallback: Partial<ClipboardItem> = {}): ClipboardItem {
  const content = String(input && input.content ? input.content : "").trim();
  if (!content) throw new Error("Conteudo vazio nao pode ser salvo.");

  const scope = input && input.scope === "global" ? "global" : "domain";
  const domain = scope === "global" ? null : String(input.domain || fallback.domain || "").trim().toLowerCase();
  if (scope === "domain" && !domain) throw new Error("Dominio obrigatorio para item deste site.");

  const createdAt = input.createdAt || fallback.createdAt || nowIso();
  const updatedAt = input.updatedAt || fallback.updatedAt || createdAt;

  return {
    id: String(input.id || fallback.id || generateId()),
    scope,
    domain,
    title: String(input.title || "").trim() || makeTitle(content),
    content,
    favorite: input.favorite === undefined ? Boolean(fallback.favorite) : Boolean(input.favorite),
    createdAt,
    updatedAt,
    lastCopiedAt: input.lastCopiedAt || fallback.lastCopiedAt || null
  };
}

export function sortItems(items: ClipboardItem[]): ClipboardItem[] {
  return [...items].sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    return String(b.updatedAt).localeCompare(String(a.updatedAt));
  });
}

export function createMemoryChromeStorage(seed: Record<string, unknown> = {}): LocalStorageArea & { _dump: () => Record<string, unknown> } {
  const state = { ...seed };

  return {
    async get(keys?: string | string[] | Record<string, unknown> | null) {
      if (!keys) return { ...state };
      if (typeof keys === "string") return { [keys]: state[keys] };
      if (Array.isArray(keys)) {
        return keys.reduce<Record<string, unknown>>((acc, key) => {
          acc[key] = state[key];
          return acc;
        }, {});
      }

      return Object.keys(keys).reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = Object.prototype.hasOwnProperty.call(state, key) ? state[key] : keys[key];
        return acc;
      }, {});
    },
    async set(values: Record<string, unknown>) {
      Object.assign(state, values);
    },
    _dump() {
      return { ...state };
    }
  };
}

function getChromeStorage(): LocalStorageArea | null {
  return globalThis.chrome?.storage?.local || null;
}

export async function readAll(storage = getChromeStorage()): Promise<ClipboardItem[]> {
  if (!storage) return [];

  const result = await storage.get({ [STORAGE_KEY]: [] });
  const rawItems = (result as Record<string, unknown>)[STORAGE_KEY];
  const items = Array.isArray(rawItems) ? rawItems : [];
  return sortItems(items.map((item) => normalizeItem(item as Partial<ClipboardItem>)));
}

export async function writeAll(items: ClipboardItem[], storage = getChromeStorage()): Promise<void> {
  if (!storage) throw new Error("Storage local indisponivel.");

  await storage.set({
    [SCHEMA_VERSION_KEY]: SCHEMA_VERSION,
    [STORAGE_KEY]: sortItems(items.map((item) => normalizeItem(item)))
  });
}

export async function listForDomain(domain: string, storage = getChromeStorage()) {
  const normalizedDomain = String(domain || "").toLowerCase();
  const items = await readAll(storage);

  return {
    domainItems: items.filter((item) => item.scope === "domain" && item.domain === normalizedDomain),
    globalItems: items.filter((item) => item.scope === "global")
  };
}

export async function upsertItem(input: Partial<ClipboardItem>, storage = getChromeStorage()): Promise<ClipboardItem> {
  const items = await readAll(storage);
  const existing = items.find((item) => item.id === input.id);
  const item = normalizeItem(input, {
    id: existing?.id,
    createdAt: existing?.createdAt,
    domain: input.domain || existing?.domain,
    favorite: existing?.favorite,
    lastCopiedAt: existing?.lastCopiedAt
  });

  item.updatedAt = nowIso();
  const next = existing ? items.map((current) => (current.id === item.id ? item : current)) : [item, ...items];
  await writeAll(next, storage);
  return item;
}

export async function deleteItem(id: string, storage = getChromeStorage()): Promise<boolean> {
  const items = await readAll(storage);
  const next = items.filter((item) => item.id !== id);
  await writeAll(next, storage);
  return items.length !== next.length;
}

export async function markCopied(id: string, storage = getChromeStorage()): Promise<string> {
  const items = await readAll(storage);
  const copiedAt = nowIso();
  const next = items.map((item) => (item.id === id ? { ...item, lastCopiedAt: copiedAt, updatedAt: item.updatedAt } : item));
  await writeAll(next, storage);
  return copiedAt;
}

export async function toggleFavorite(id: string, storage = getChromeStorage()): Promise<ClipboardItem | null> {
  const items = await readAll(storage);
  let changed: ClipboardItem | null = null;
  const next = items.map((item) => {
    if (item.id !== id) return item;
    changed = { ...item, favorite: !item.favorite, updatedAt: nowIso() };
    return changed;
  });

  await writeAll(next, storage);
  return changed;
}
