import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * A single saved clipboard item. The whole card is the copy affordance;
 * edit / delete reveal on hover; the favorite star toggles inline.
 */
export function ClipboardItem({
  title,
  content,
  scope = 'domain',           // 'domain' | 'global'
  favorite = false,
  meta,                       // e.g. "Copiado há 2 dias"
  copied = false,             // success feedback flag
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  const showActions = hover;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onCopy}
      role="button"
      tabIndex={0}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '10px 12px',
        background: copied ? 'var(--green-50)' : hover ? 'var(--surface-card)' : 'var(--surface-card)',
        border: '1px solid ' + (copied ? 'var(--green-200)' : hover ? 'var(--border-default)' : 'var(--border-hairline)'),
        borderRadius: 'var(--radius-md)',
        boxShadow: hover ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
        cursor: 'pointer',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
        ...style,
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          flex: 1, minWidth: 0,
          font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-ui)',
          color: 'var(--text-strong)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</span>
        {scope === 'global' && <Badge tone="global" icon="globe">Global</Badge>}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(); }}
          aria-label={favorite ? 'Remover dos favoritos' : 'Favoritar'}
          style={{
            display: (favorite || hover) ? 'flex' : 'none',
            alignItems: 'center', justifyContent: 'center', width: 22, height: 22,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            color: favorite ? 'var(--favorite)' : 'var(--text-muted)',
          }}
        >
          <Icon name="star" size={15} style={favorite ? { fill: 'var(--favorite)' } : undefined} />
        </button>
      </div>

      {/* content preview */}
      <p style={{
        margin: 0,
        font: 'var(--fw-regular) var(--text-xs)/1.5 var(--font-mono)',
        color: 'var(--text-muted)',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{content}</p>

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 22 }}>
        <span style={{
          flex: 1, minWidth: 0,
          font: 'var(--type-meta)',
          color: copied ? 'var(--text-brand)' : 'var(--text-muted)',
          display: 'inline-flex', alignItems: 'center', gap: 5,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {copied
            ? (<><Icon name="check" size={13} strokeWidth={2.4} /> Copiado</>)
            : meta}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2, opacity: showActions ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-out)' }}>
          <IconButton icon="pencil" size="sm" label="Editar"
            onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }} />
          <IconButton icon="trash" size="sm" tone="danger" label="Excluir"
            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }} />
        </div>

        {!showActions && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-brand)', font: 'var(--fw-semibold) var(--text-2xs)/1 var(--font-ui)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)' }}>
            <Icon name="copy" size={13} /> Copiar
          </span>
        )}
      </div>
    </div>
  );
}
