import * as React from 'react';

export interface ClipboardItemProps {
  /** Item title (auto-generated from content when the user leaves it blank). */
  title: string;
  /** The saved text — shown as a 2-line monospace preview. */
  content: string;
  /** 'domain' = scoped to current site, 'global' = available everywhere. */
  scope?: 'domain' | 'global';
  favorite?: boolean;
  /** Right-aligned metadata string, e.g. "Copiado há 2 dias". */
  meta?: string;
  /** When true, shows the green "Copiado" success state. */
  copied?: boolean;
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFavorite?: () => void;
  style?: React.CSSProperties;
}

/**
 * @startingPoint section="Clipboard" subtitle="Saved item row — copy / edit / delete / favorite" viewport="380x96"
 * The core product object: one saved snippet. The whole card copies on
 * click; edit & delete reveal on hover; the star favorites inline.
 */
export function ClipboardItem(props: ClipboardItemProps): JSX.Element;
