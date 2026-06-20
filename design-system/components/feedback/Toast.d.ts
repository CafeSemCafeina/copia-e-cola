import * as React from 'react';
import { IconName } from '../core/Button';

/**
 * Brief, non-blocking confirmation after save / copy / delete. The
 * host owns positioning (bottom-center of the popup) and the timer.
 */
export interface ToastProps {
  children?: React.ReactNode;
  /** @default "success" */
  tone?: 'success' | 'neutral' | 'danger';
  /** Override the default icon for the tone. */
  icon?: IconName;
  /** Animate in/out. @default true */
  visible?: boolean;
  style?: React.CSSProperties;
}

export function Toast(props: ToastProps): JSX.Element;
