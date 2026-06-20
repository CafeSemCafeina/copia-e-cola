import React from 'react';
import { Icon } from './Icon.jsx';

/**
 * Badge — small status / count pill. Tones map to semantic colors.
 * `global` (blue) marks cross-site items; `amber` marks favorites.
 * Set `mono` for literal values like a domain.
 */
const TONES = {
  neutral: { bg: 'var(--paper-100)', fg: 'var(--text-muted)', bd: 'var(--border-hairline)' },
  brand:   { bg: 'var(--green-50)', fg: 'var(--text-brand)', bd: 'var(--green-100)' },
  global:  { bg: 'var(--blue-50)', fg: 'var(--blue-600)', bd: '#cfe0f6' },
  amber:   { bg: 'var(--amber-50)', fg: 'var(--amber-600)', bd: 'var(--amber-100)' },
  danger:  { bg: 'var(--red-50)', fg: 'var(--text-danger)', bd: 'var(--red-100)' },
};

export function Badge({ children, tone = 'neutral', icon, mono = false, style = {}, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 19,
        padding: '0 7px',
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        borderRadius: 'var(--radius-pill)',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
        fontWeight: mono ? 'var(--fw-medium)' : 'var(--fw-semibold)',
        fontSize: 'var(--text-2xs)',
        letterSpacing: mono ? 0 : 'var(--ls-wide)',
        textTransform: mono ? 'none' : 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={11} strokeWidth={2.2} />}
      {children}
    </span>
  );
}
