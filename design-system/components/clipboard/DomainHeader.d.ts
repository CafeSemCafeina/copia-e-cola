import * as React from 'react';

export interface DomainHeaderProps {
  /** Normalized current domain, or null for unsupported pages. */
  domain: string | null;
  /** Item count for this domain (optional). */
  count?: number;
  onSettings?: () => void;
  style?: React.CSSProperties;
}

/**
 * The popup's top bar: brand logomark, product name, and the current
 * site context as a mono chip. Falls back to an "unsupported page"
 * state when `domain` is null.
 */
export function DomainHeader(props: DomainHeaderProps): JSX.Element;
