import React from 'react';
import { Icon } from './Icon.jsx';

/**
 * IconButton — compact square control for row actions (copiar,
 * editar, excluir, favoritar). Icon referenced by name; always pass
 * an accessible `label`.
 */
const SIZES = { sm: 26, md: 30, lg: 34 };
const ICON = { sm: 15, md: 17, lg: 18 };

export function IconButton({
  icon,
  size = 'md',
  tone = 'neutral',          // 'neutral' | 'brand' | 'danger' | 'favorite'
  active = false,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;

  let color = 'var(--text-muted)';
  let bg = hover && !disabled ? 'var(--surface-hover)' : 'transparent';
  if (tone === 'brand') color = hover ? 'var(--brand-hover)' : 'var(--text-brand)';
  if (tone === 'danger') {
    color = 'var(--text-danger)';
    if (hover && !disabled) bg = 'var(--red-50)';
  }
  if (tone === 'favorite') {
    color = active ? 'var(--favorite)' : 'var(--text-muted)';
    if (hover && !disabled) bg = 'var(--amber-50)';
  }
  if (tone === 'neutral' && hover && !disabled) color = 'var(--text-strong)';

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid transparent',
        background: bg,
        color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <Icon
        name={icon}
        size={ICON[size] || ICON.md}
        strokeWidth={2}
        style={tone === 'favorite' && active ? { fill: 'var(--favorite)' } : undefined}
      />
    </button>
  );
}
