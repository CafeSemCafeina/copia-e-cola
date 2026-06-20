(function defineBackup(global) {
  const PRODUCT = "copia-e-cola";
  const BACKUP_VERSION = 1;
  const MAX_IMPORT_BYTES = 1024 * 1024;

  function buildExport(items) {
    return {
      product: PRODUCT,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      items
    };
  }

  function parseImportPayload(text, normalizeItem) {
    if (typeof text !== "string" || !text.trim()) {
      throw new Error("Arquivo JSON vazio.");
    }

    if (new Blob([text]).size > MAX_IMPORT_BYTES) {
      throw new Error("Arquivo muito grande para importar no MVP.");
    }

    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      throw new Error("JSON invalido. Exporte novamente pelo Copia e Cola.");
    }

    if (!payload || payload.product !== PRODUCT || payload.version !== BACKUP_VERSION || !Array.isArray(payload.items)) {
      throw new Error("Formato de backup nao reconhecido.");
    }

    return payload.items.map((item) => normalizeItem(item));
  }

  function mergeImportedItems(currentItems, importedItems) {
    const ids = new Set(currentItems.map((item) => item.id));
    const accepted = [];
    let skipped = 0;

    for (const item of importedItems) {
      if (ids.has(item.id)) {
        skipped += 1;
        continue;
      }

      ids.add(item.id);
      accepted.push(item);
    }

    return {
      items: [...accepted, ...currentItems],
      imported: accepted.length,
      skipped
    };
  }

  const api = {
    BACKUP_VERSION,
    MAX_IMPORT_BYTES,
    PRODUCT,
    buildExport,
    mergeImportedItems,
    parseImportPayload
  };

  global.CopiaEColaBackup = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
