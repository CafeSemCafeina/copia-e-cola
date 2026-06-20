(function defineStorage(global) {
  const STORAGE_KEY = "copiaEColaItems";
  const SCHEMA_VERSION_KEY = "copiaEColaSchemaVersion";
  const SCHEMA_VERSION = 1;

  function nowIso() {
    return new Date().toISOString();
  }

  function generateId() {
    if (global.crypto && typeof global.crypto.randomUUID === "function") {
      return global.crypto.randomUUID();
    }

    return `item_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function makeTitle(content) {
    return String(content || "").trim().replace(/\s+/g, " ").slice(0, 48) || "Sem titulo";
  }

  function normalizeItem(input, fallback = {}) {
    const content = String(input && input.content ? input.content : "").trim();

    if (!content) {
      throw new Error("Conteudo vazio nao pode ser salvo.");
    }

    const scope = input && input.scope === "global" ? "global" : "domain";
    const domain = scope === "global" ? null : String(input.domain || fallback.domain || "").trim().toLowerCase();

    if (scope === "domain" && !domain) {
      throw new Error("Dominio obrigatorio para item deste site.");
    }

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

  function sortItems(items) {
    return [...items].sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return a.favorite ? -1 : 1;
      }

      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
  }

  function createMemoryChromeStorage(seed = {}) {
    const state = { ...seed };

    return {
      async get(keys) {
        if (!keys) {
          return { ...state };
        }

        if (typeof keys === "string") {
          return { [keys]: state[keys] };
        }

        if (Array.isArray(keys)) {
          return keys.reduce((acc, key) => {
            acc[key] = state[key];
            return acc;
          }, {});
        }

        return Object.keys(keys).reduce((acc, key) => {
          acc[key] = Object.prototype.hasOwnProperty.call(state, key) ? state[key] : keys[key];
          return acc;
        }, {});
      },
      async set(values) {
        Object.assign(state, values);
      },
      _dump() {
        return { ...state };
      }
    };
  }

  function getChromeStorage() {
    if (global.chrome && global.chrome.storage && global.chrome.storage.local) {
      return global.chrome.storage.local;
    }

    return null;
  }

  async function readAll(storage = getChromeStorage()) {
    if (!storage) {
      return [];
    }

    const result = await storage.get({ [STORAGE_KEY]: [] });
    const items = Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : [];
    return sortItems(items.map((item) => normalizeItem(item)));
  }

  async function writeAll(items, storage = getChromeStorage()) {
    if (!storage) {
      throw new Error("Storage local indisponivel.");
    }

    await storage.set({
      [SCHEMA_VERSION_KEY]: SCHEMA_VERSION,
      [STORAGE_KEY]: sortItems(items.map((item) => normalizeItem(item)))
    });
  }

  async function listForDomain(domain, storage = getChromeStorage()) {
    const normalizedDomain = String(domain || "").toLowerCase();
    const items = await readAll(storage);

    return {
      domainItems: items.filter((item) => item.scope === "domain" && item.domain === normalizedDomain),
      globalItems: items.filter((item) => item.scope === "global")
    };
  }

  async function upsertItem(input, storage = getChromeStorage()) {
    const items = await readAll(storage);
    const existing = items.find((item) => item.id === input.id);
    const item = normalizeItem(input, {
      id: existing && existing.id,
      createdAt: existing && existing.createdAt,
      domain: input.domain || (existing && existing.domain),
      favorite: existing && existing.favorite,
      lastCopiedAt: existing && existing.lastCopiedAt
    });

    item.updatedAt = nowIso();

    const next = existing
      ? items.map((current) => (current.id === item.id ? item : current))
      : [item, ...items];

    await writeAll(next, storage);
    return item;
  }

  async function deleteItem(id, storage = getChromeStorage()) {
    const items = await readAll(storage);
    const next = items.filter((item) => item.id !== id);
    await writeAll(next, storage);
    return items.length !== next.length;
  }

  async function markCopied(id, storage = getChromeStorage()) {
    const items = await readAll(storage);
    const copiedAt = nowIso();
    const next = items.map((item) => (
      item.id === id ? { ...item, lastCopiedAt: copiedAt, updatedAt: item.updatedAt } : item
    ));

    await writeAll(next, storage);
    return copiedAt;
  }

  async function toggleFavorite(id, storage = getChromeStorage()) {
    const items = await readAll(storage);
    let changed = null;
    const next = items.map((item) => {
      if (item.id !== id) {
        return item;
      }

      changed = { ...item, favorite: !item.favorite, updatedAt: nowIso() };
      return changed;
    });

    await writeAll(next, storage);
    return changed;
  }

  const api = {
    STORAGE_KEY,
    SCHEMA_VERSION,
    createMemoryChromeStorage,
    deleteItem,
    listForDomain,
    makeTitle,
    markCopied,
    normalizeItem,
    readAll,
    toggleFavorite,
    upsertItem,
    writeAll
  };

  global.CopiaEColaStorage = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
