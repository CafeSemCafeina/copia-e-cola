import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * SearchInput — compact local filter for the item list, with a
 * leading search glyph and a clear (×) button once typed in.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  onClear,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', ...style }}>
      <span style={{ position: 'absolute', left: 9, color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex' }}>
        <Icon name="search" size={15} />
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          height: 32,
          padding: '0 28px 0 30px',
          boxSizing: 'border-box',
          background: 'var(--surface-sunken)',
          color: 'var(--text-strong)',
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-sm)',
          border: `1px solid ${focus ? 'var(--border-focus)' : 'transparent'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          boxShadow: focus ? 'var(--focus-ring)' : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
        }}
        {...rest}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpar busca"
          style={{
            position: 'absolute', right: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20,
            border: 'none', background: 'transparent', color: 'var(--text-muted)',
            cursor: 'pointer', borderRadius: 'var(--radius-xs)',
          }}
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}
