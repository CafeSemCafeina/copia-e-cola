import * as React from 'react';

export type IconName =
  | 'copy' | 'check' | 'check-circle' | 'search' | 'star' | 'pencil'
  | 'trash' | 'plus' | 'x' | 'globe' | 'download' | 'upload'
  | 'more-horizontal' | 'lock' | 'shield-check' | 'arrow-left'
  | 'filter' | 'settings' | 'inbox';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Glyph name from the Copia e Cola line-icon set. */
  name: IconName;
  /** Pixel size (width & height). Default 18. */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
}

/**
 * Line icon, 2px stroke, 24px grid, inherits `currentColor`.
 * The single icon primitive used across the system.
 */
export function Icon(props: IconProps): JSX.Element;
