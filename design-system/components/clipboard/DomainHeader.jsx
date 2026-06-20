import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';

/**
 * Popup header: brand logomark + the current site context. Shows the
 * normalized domain as a mono chip, with optional item count and a
 * settings affordance. Renders an "unsupported page" state when domain
 * is null (chrome://, about:blank, local files).
 */
export function DomainHeader({
  domain,                    // string | null
  count,                     // number of items for this domain
  onSettings,
  style = {},
}) {
  const unsupported = !domain;
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 14px',
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-hairline)',
        ...style,
      }}
    >
      {/* logomark */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, background: 'var(--green-50)', flexShrink: 0 }}>
        <span style={{ position: 'relative', width: 18, height: 18, display: 'block' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 12, borderRadius: 3, border: '1.6px solid var(--green-500)', opacity: 0.5 }} />
          <span style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, borderRadius: 3, background: 'var(--green-500)' }} />
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ font: 'var(--fw-bold) var(--text-xs)/1 var(--font-ui)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Copia e Cola
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <Icon name={unsupported ? 'lock' : 'globe'} size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span style={{
            font: 'var(--fw-medium) var(--text-sm)/1.2 var(--font-mono)',
            color: unsupported ? 'var(--text-muted)' : 'var(--text-strong)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {unsupported ? 'Página não suportada' : domain}
          </span>
          {!unsupported && typeof count === 'number' && (
            <span style={{ font: 'var(--type-meta)', color: 'var(--text-muted)', flexShrink: 0 }}>· {count}</span>
          )}
        </div>
      </div>

      {onSettings && <IconButton icon="settings" label="Configurações" onClick={onSettings} />}
    </header>
  );
}
