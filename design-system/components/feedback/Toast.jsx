import React from 'react';

/**
 * Toast — brief confirmation for save / copy / delete. Pin it near
 * the bottom of the popup; the host owns the auto-dismiss timer.
 */
import { Icon } from '../core/Icon.jsx';

const TONES = {
  success: { bg: 'var(--green-700)', icon: 'check-circle' },
  neutral: { bg: 'var(--ink-900)', icon: 'check' },
  danger:  { bg: 'var(--red-600)', icon: 'x' },
};

export function Toast({ children, tone = 'success', icon, visible = true, style = {} }) {
  const t = TONES[tone] || TONES.success;
  return (
    <div
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        background: t.bg,
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-ui)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Icon name={icon || t.icon} size={16} strokeWidth={2.4} />
      {children}
    </div>
  );
}
