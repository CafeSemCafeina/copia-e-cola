import * as React from 'react';

/**
 * Compact local filter with a leading search glyph and a clear (×)
 * button. Filters the item list by title and content.
 */
export interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** @default "Buscar..." */
  placeholder?: string;
  /** Renders a clear (×) button when there is a value. */
  onClear?: () => void;
  style?: React.CSSProperties;
}

export function SearchInput(props: SearchInputProps): JSX.Element;
