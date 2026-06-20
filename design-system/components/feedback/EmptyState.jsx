import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Empty state for the item list. Quiet, one line of guidance, no
 * heavy illustration — per the product's "orienta sem excesso de texto".
 */
export function EmptyState({
  icon = 'inbox',
  title = 'Nenhum item salvo para este site ainda',
  description,
  action,                    // optional React node (e.g. a Button)
  style = {},
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        padding: '32px 24px',
        ...style,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 44, height: 44, borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-sunken)', color: 'var(--text-muted)',
        marginBottom: 2,
      }}>
        <Icon name={icon} size={22} strokeWidth={1.8} />
      </div>
      <p style={{ margin: 0, font: 'var(--fw-semibold) var(--text-sm)/1.35 var(--font-ui)', color: 'var(--text-body)', maxWidth: 240 }}>
        {title}
      </p>
      {description && (
        <p style={{ margin: 0, font: 'var(--fw-regular) var(--text-xs)/1.5 var(--font-ui)', color: 'var(--text-muted)', maxWidth: 240 }}>
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: 6 }}>{action}</div>}
    </div>
  );
}
