import * as React from 'react';

/**
 * Multi-line content field — the saved text/snippet. Monospace by
 * default since items are literal text to paste elsewhere.
 */
export interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  /** @default 4 */
  rows?: number;
  /** Error state. @default false */
  invalid?: boolean;
  disabled?: boolean;
  /** Use monospace. @default true */
  mono?: boolean;
  style?: React.CSSProperties;
  /** Style override on the <textarea> element itself. */
  textareaStyle?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): JSX.Element;
