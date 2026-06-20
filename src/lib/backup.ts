import type { ClipboardItem } from "../types";

export const PRODUCT = "copia-e-cola";
export const BACKUP_VERSION = 1;
export const MAX_IMPORT_BYTES = 1024 * 1024;

export type BackupPayload = {
  product: typeof PRODUCT;
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  items: ClipboardItem[];
};

export function buildExport(items: ClipboardItem[]): BackupPayload {
  return {
    product: PRODUCT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    items
  };
}

export function parseImportPayload(text: string, normalizeItem: (item: Partial<ClipboardItem>) => ClipboardItem): ClipboardItem[] {
  if (typeof text !== "string" || !text.trim()) throw new Error("Arquivo JSON vazio.");
  if (new Blob([text]).size > MAX_IMPORT_BYTES) throw new Error("Arquivo muito grande para importar no MVP.");

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("JSON invalido. Exporte novamente pelo Copia e Cola.");
  }

  const candidate = payload as Partial<BackupPayload>;
  if (!candidate || candidate.product !== PRODUCT || candidate.version !== BACKUP_VERSION || !Array.isArray(candidate.items)) {
    throw new Error("Formato de backup nao reconhecido.");
  }

  return candidate.items.map((item) => normalizeItem(item));
}

export function mergeImportedItems(currentItems: ClipboardItem[], importedItems: ClipboardItem[]) {
  const ids = new Set(currentItems.map((item) => item.id));
  const accepted: ClipboardItem[] = [];
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
