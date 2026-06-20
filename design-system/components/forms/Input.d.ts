import * as React from 'react';

/** Single-line text field — the optional item title. */
export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Label rendered above the field. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error state — red border/ring and red hint. @default false */
  invalid?: boolean;
  disabled?: boolean;
  /** Use monospace (for literal values). @default false */
  mono?: boolean;
  style?: React.CSSProperties;
  /** Style override on the <input> element itself. */
  inputStyle?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
