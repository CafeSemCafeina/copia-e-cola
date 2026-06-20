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

function contextsOverlap(a: Partial<ClipboardItem>, b: Partial<ClipboardItem>): boolean {
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
      return { type: "duplicate", item, message: `O comando ${trigger} ja existe nesse contexto.` };
    }
    if (existing.startsWith(trigger) || trigger.startsWith(existing)) {
      return { type: "prefix", item, message: `O comando ${trigger} conflita com ${existing}.` };
    }
  }

  return null;
}
