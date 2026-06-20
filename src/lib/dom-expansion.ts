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
