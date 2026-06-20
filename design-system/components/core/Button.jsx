import React from 'react';
import { Icon } from './Icon.jsx';

/**
 * Button — primary action control. Brand emerald primary, neutral
 * secondary, ghost and danger. Icons are referenced by name (string)
 * and rendered via the Icon component.
 */
const SIZES = {
  sm: { height: 28, padding: '0 10px', font: 'var(--text-xs)', gap: 6, icon: 15 },
  md: { height: 34, padding: '0 14px', font: 'var(--text-sm)', gap: 7, icon: 17 },
  lg: { height: 40, padding: '0 18px', font: 'var(--text-base)', gap: 8, icon: 18 },
};

function variantStyle(variant, hover, press) {
  switch (variant) {
    case 'secondary':
      return {
        background: press ? 'var(--surface-pressed)' : hover ? 'var(--surface-hover)' : 'var(--surface-card)',
        color: 'var(--text-strong)',
        border: '1px solid var(--border-default)',
      };
    case 'ghost':
      return {
        background: press ? 'var(--surface-pressed)' : hover ? 'var(--surface-hover)' : 'transparent',
        color: 'var(--text-body)',
        border: '1px solid transparent',
      };
    case 'danger':
      return {
        background: (press || hover) ? 'var(--danger-hover)' : 'var(--danger)',
        color: '#fff',
        border: '1px solid transparent',
      };
    case 'primary':
    default:
      return {
        background: press ? 'var(--brand-press)' : hover ? 'var(--brand-hover)' : 'var(--brand)',
        color: 'var(--text-on-brand)',
        border: '1px solid transparent',
      };
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const vs = variantStyle(variant, hover && !disabled, press && !disabled);

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        font: `var(--fw-semibold) ${s.font}/1 var(--font-ui)`,
        letterSpacing: 'var(--ls-normal)',
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transform: press && !disabled ? 'translateY(0.5px)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        ...vs,
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </button>
  );
}
