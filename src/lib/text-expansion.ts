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
