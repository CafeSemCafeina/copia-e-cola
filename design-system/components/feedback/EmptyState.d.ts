import * as React from 'react';
import type { IconName } from '../core/Icon';

export interface EmptyStateProps {
  icon?: IconName;
  title?: string;
  description?: string;
  /** Optional action node (e.g. a Button). */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Quiet empty state for the item list — a soft icon tile, one line of
 * guidance, optional action. Deliberately low on text and illustration.
 */
export function EmptyState(props: EmptyStateProps): JSX.Element;
