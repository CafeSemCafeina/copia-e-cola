import * as React from 'react';
import { IconName } from './Button';

/**
 * Compact square icon-only control for row actions (copiar, editar,
 * excluir, favoritar). Always pass an accessible `label`.
 */
export interface IconButtonProps {
  /** Icon name. */
  icon: IconName;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** @default "neutral" */
  tone?: 'neutral' | 'brand' | 'danger' | 'favorite';
  /** Held/active state (e.g. favorited — fills the star). @default false */
  active?: boolean;
  /** Accessible label / tooltip — required. */
  label: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
