import * as React from 'react';

/** Lucide-style icon names available in the Icon set. */
export type IconName =
  | 'copy' | 'check' | 'check-circle' | 'search' | 'star' | 'pencil'
  | 'trash' | 'plus' | 'x' | 'globe' | 'download' | 'upload'
  | 'more-horizontal' | 'lock' | 'shield-check' | 'arrow-left'
  | 'filter' | 'settings' | 'inbox';

/**
 * Primary action control. Emerald `primary`, neutral `secondary`,
 * `ghost`, and `danger`. Icons are referenced by name.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon name. */
  icon?: IconName;
  /** Trailing icon name. */
  iconRight?: IconName;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
