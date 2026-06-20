import * as React from 'react';
import { IconName } from './Button';

/**
 * Small status / count pill. `global` (blue) marks cross-site items;
 * `amber` marks favorites. Set `mono` for literal values (a domain).
 */
export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: 'neutral' | 'brand' | 'global' | 'amber' | 'danger';
  /** Optional leading icon name. */
  icon?: IconName;
  /** Render in monospace, lowercase (for domains/values). @default false */
  mono?: boolean;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
