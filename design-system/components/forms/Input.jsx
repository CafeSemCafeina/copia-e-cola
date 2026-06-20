import React from 'react';

/**
 * Input — single-line text field (the optional item title).
 */
export function Input({
  value,
  onChange,
  placeholder,
  label,
  hint,
  invalid = false,
  disabled = false,
  mono = false,
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', ...style }}>
      {label && <span style={{ font: 'var(--type-label)', color: 'var(--text-body)' }}>{label}</span>}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          height: 34,
          padding: '0 10px',
          boxSizing: 'border-box',
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          color: 'var(--text-strong)',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--fw-regular)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          boxShadow: focus ? (invalid ? 'var(--focus-ring-danger)' : 'var(--focus-ring)') : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          ...inputStyle,
        }}
        {...rest}
      />
      {hint && <span style={{ font: 'var(--type-meta)', color: invalid ? 'var(--text-danger)' : 'var(--text-muted)' }}>{hint}</span>}
    </label>
  );
}
