/* @ds-bundle: {"format":3,"namespace":"CopiaEColaDesignSystem_b68b1c","components":[{"name":"ClipboardItem","sourcePath":"components/clipboard/ClipboardItem.jsx"},{"name":"DomainHeader","sourcePath":"components/clipboard/DomainHeader.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/clipboard/ClipboardItem.jsx":"6c690e43942c","components/clipboard/DomainHeader.jsx":"1d94d2be83bc","components/core/Badge.jsx":"0dfbf9c94aff","components/core/Button.jsx":"6a764c0975b7","components/core/Icon.jsx":"9879769b355b","components/core/IconButton.jsx":"7fc7008f2db0","components/feedback/EmptyState.jsx":"13eee26875ff","components/feedback/Toast.jsx":"5cb4e0e033c3","components/forms/Input.jsx":"2fedb588ba94","components/forms/SearchInput.jsx":"f5fb5bf0c78f","components/forms/Textarea.jsx":"c20704c06aae","ui_kits/extension/PopupApp.jsx":"e1afd9799a43"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CopiaEColaDesignSystem_b68b1c = window.CopiaEColaDesignSystem_b68b1c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Curated Lucide-style icon set (stroke 2, 24px grid, currentColor).
   Copia e Cola uses line icons exclusively — clean, utilitarian,
   consistent 2px stroke. Add new glyphs to PATHS as needed. */
const PATHS = {
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "11",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15V5a2 2 0 0 1 2-2h8"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }),
  'check-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8.5 12 2.5 2.5 4.5-5"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.2-3.2"
  })),
  star: /*#__PURE__*/React.createElement("path", {
    d: "M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
  }),
  pencil: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 6.5l3 3"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12"
  })),
  globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"
  })),
  download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 4v11"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 11 5 5 5-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20h14"
  })),
  upload: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 20V9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 13 5-5 5 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 4h14"
  })),
  'more-horizontal': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.4"
  })),
  lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "11",
    width: "14",
    height: "9",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11V8a4 4 0 0 1 8 0v3"
  })),
  'shield-check': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  'arrow-left': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 19-7-7 7-7"
  })),
  filter: /*#__PURE__*/React.createElement("path", {
    d: "M3 5h18l-7 8v5l-4 2v-7z"
  }),
  settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-2-3.4-1.9.8a7.6 7.6 0 0 0-2.6-1.5L14.3 2H9.7l-.3 2.2a7.6 7.6 0 0 0-2.6 1.5l-1.9-.8-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L3 14.7l2 3.4 1.9-.8a7.6 7.6 0 0 0 2.6 1.5L9.7 22h4.6l.3-2.2a7.6 7.6 0 0 0 2.6-1.5l1.9.8 2-3.4z"
  })),
  inbox: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h5l1.5 2.5h5L16 12h5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 5h14l2 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"
  }))
};
function Icon({
  name,
  size = 18,
  strokeWidth = 2,
  className = '',
  style = {},
  ...rest
}) {
  const path = PATHS[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true"
  }, rest), path || null);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status / count pill. Tones map to semantic colors.
 * `global` (blue) marks cross-site items; `amber` marks favorites.
 * Set `mono` for literal values like a domain.
 */
const TONES = {
  neutral: {
    bg: 'var(--paper-100)',
    fg: 'var(--text-muted)',
    bd: 'var(--border-hairline)'
  },
  brand: {
    bg: 'var(--green-50)',
    fg: 'var(--text-brand)',
    bd: 'var(--green-100)'
  },
  global: {
    bg: 'var(--blue-50)',
    fg: 'var(--blue-600)',
    bd: '#cfe0f6'
  },
  amber: {
    bg: 'var(--amber-50)',
    fg: 'var(--amber-600)',
    bd: 'var(--amber-100)'
  },
  danger: {
    bg: 'var(--red-50)',
    fg: 'var(--text-danger)',
    bd: 'var(--red-100)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  icon,
  mono = false,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 11,
    strokeWidth: 2.2
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control. Brand emerald primary, neutral
 * secondary, ghost and danger. Icons are referenced by name (string)
 * and rendered via the Icon component.
 */
const SIZES = {
  sm: {
    height: 28,
    padding: '0 10px',
    font: 'var(--text-xs)',
    gap: 6,
    icon: 15
  },
  md: {
    height: 34,
    padding: '0 14px',
    font: 'var(--text-sm)',
    gap: 7,
    icon: 17
  },
  lg: {
    height: 40,
    padding: '0 18px',
    font: 'var(--text-base)',
    gap: 8,
    icon: 18
  }
};
function variantStyle(variant, hover, press) {
  switch (variant) {
    case 'secondary':
      return {
        background: press ? 'var(--surface-pressed)' : hover ? 'var(--surface-hover)' : 'var(--surface-card)',
        color: 'var(--text-strong)',
        border: '1px solid var(--border-default)'
      };
    case 'ghost':
      return {
        background: press ? 'var(--surface-pressed)' : hover ? 'var(--surface-hover)' : 'transparent',
        color: 'var(--text-body)',
        border: '1px solid transparent'
      };
    case 'danger':
      return {
        background: press || hover ? 'var(--danger-hover)' : 'var(--danger)',
        color: '#fff',
        border: '1px solid transparent'
      };
    case 'primary':
    default:
      return {
        background: press ? 'var(--brand-press)' : hover ? 'var(--brand-hover)' : 'var(--brand)',
        color: 'var(--text-on-brand)',
        border: '1px solid transparent'
      };
  }
}
function Button({
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — compact square control for row actions (copiar,
 * editar, excluir, favoritar). Icon referenced by name; always pass
 * an accessible `label`.
 */
const SIZES = {
  sm: 26,
  md: 30,
  lg: 34
};
const ICON = {
  sm: 15,
  md: 17,
  lg: 18
};
function IconButton({
  icon,
  size = 'md',
  tone = 'neutral',
  // 'neutral' | 'brand' | 'danger' | 'favorite'
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: ICON[size] || ICON.md,
    strokeWidth: 2,
    style: tone === 'favorite' && active ? {
      fill: 'var(--favorite)'
    } : undefined
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/clipboard/ClipboardItem.jsx
try { (() => {
/**
 * A single saved clipboard item. The whole card is the copy affordance;
 * edit / delete reveal on hover; the favorite star toggles inline.
 */
function ClipboardItem({
  title,
  content,
  scope = 'domain',
  // 'domain' | 'global'
  favorite = false,
  meta,
  // e.g. "Copiado há 2 dias"
  copied = false,
  // success feedback flag
  onCopy,
  onEdit,
  onDelete,
  onToggleFavorite,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const showActions = hover;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onCopy,
    role: "button",
    tabIndex: 0,
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-ui)',
      color: 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), scope === 'global' && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "global",
    icon: "globe"
  }, "Global"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onToggleFavorite && onToggleFavorite();
    },
    "aria-label": favorite ? 'Remover dos favoritos' : 'Favoritar',
    style: {
      display: favorite || hover ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      color: favorite ? 'var(--favorite)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: 15,
    style: favorite ? {
      fill: 'var(--favorite)'
    } : undefined
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--fw-regular) var(--text-xs)/1.5 var(--font-mono)',
      color: 'var(--text-muted)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, content), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minHeight: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: 'var(--type-meta)',
      color: copied ? 'var(--text-brand)' : 'var(--text-muted)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, copied ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.4
  }), " Copiado") : meta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      opacity: showActions ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "pencil",
    size: "sm",
    label: "Editar",
    onClick: e => {
      e.stopPropagation();
      onEdit && onEdit();
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "trash",
    size: "sm",
    tone: "danger",
    label: "Excluir",
    onClick: e => {
      e.stopPropagation();
      onDelete && onDelete();
    }
  })), !showActions && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--text-brand)',
      font: 'var(--fw-semibold) var(--text-2xs)/1 var(--font-ui)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-wide)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "copy",
    size: 13
  }), " Copiar")));
}
Object.assign(__ds_scope, { ClipboardItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/clipboard/ClipboardItem.jsx", error: String((e && e.message) || e) }); }

// components/clipboard/DomainHeader.jsx
try { (() => {
/**
 * Popup header: brand logomark + the current site context. Shows the
 * normalized domain as a mono chip, with optional item count and a
 * settings affordance. Renders an "unsupported page" state when domain
 * is null (chrome://, about:blank, local files).
 */
function DomainHeader({
  domain,
  // string | null
  count,
  // number of items for this domain
  onSettings,
  style = {}
}) {
  const unsupported = !domain;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-hairline)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 8,
      background: 'var(--green-50)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 18,
      height: 18,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 12,
      height: 12,
      borderRadius: 3,
      border: '1.6px solid var(--green-500)',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 12,
      height: 12,
      borderRadius: 3,
      background: 'var(--green-500)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-xs)/1 var(--font-ui)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Copia e Cola"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: unsupported ? 'lock' : 'globe',
    size: 13,
    style: {
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-sm)/1.2 var(--font-mono)',
      color: unsupported ? 'var(--text-muted)' : 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, unsupported ? 'Página não suportada' : domain), !unsupported && typeof count === 'number' && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, "\xB7 ", count))), onSettings && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "settings",
    label: "Configura\xE7\xF5es",
    onClick: onSettings
  }));
}
Object.assign(__ds_scope, { DomainHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/clipboard/DomainHeader.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/**
 * Empty state for the item list. Quiet, one line of guidance, no
 * heavy illustration — per the product's "orienta sem excesso de texto".
 */
function EmptyState({
  icon = 'inbox',
  title = 'Nenhum item salvo para este site ainda',
  description,
  action,
  // optional React node (e.g. a Button)
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 8,
      padding: '32px 24px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    strokeWidth: 1.8
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--fw-semibold) var(--text-sm)/1.35 var(--font-ui)',
      color: 'var(--text-body)',
      maxWidth: 240
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--fw-regular) var(--text-xs)/1.5 var(--font-ui)',
      color: 'var(--text-muted)',
      maxWidth: 240
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Toast — brief confirmation for save / copy / delete. Pin it near
 * the bottom of the popup; the host owns the auto-dismiss timer.
 */

const TONES = {
  success: {
    bg: 'var(--green-700)',
    icon: 'check-circle'
  },
  neutral: {
    bg: 'var(--ink-900)',
    icon: 'check'
  },
  danger: {
    bg: 'var(--red-600)',
    icon: 'x'
  }
};
function Toast({
  children,
  tone = 'success',
  icon,
  visible = true,
  style = {}
}) {
  const t = TONES[tone] || TONES.success;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || t.icon,
    size: 16,
    strokeWidth: 2.4
  }), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field (the optional item title).
 */
function Input({
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
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
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
      boxShadow: focus ? invalid ? 'var(--focus-ring-danger)' : 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...inputStyle
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: invalid ? 'var(--text-danger)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SearchInput — compact local filter for the item list, with a
 * leading search glyph and a clear (×) button once typed in.
 */
function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  onClear,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 9,
      color: 'var(--text-muted)',
      pointerEvents: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
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
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)'
    }
  }, rest)), value && onClear && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClear,
    "aria-label": "Limpar busca",
    style: {
      position: 'absolute',
      right: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      borderRadius: 'var(--radius-xs)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — multi-line content field (the saved text). Monospace by
 * default, since items are literal text to paste elsewhere.
 */
function Textarea({
  value,
  onChange,
  placeholder,
  label,
  hint,
  rows = 4,
  invalid = false,
  disabled = false,
  mono = true,
  style = {},
  textareaStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '9px 10px',
      boxSizing: 'border-box',
      resize: 'vertical',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      color: 'var(--text-strong)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--lh-normal)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      boxShadow: focus ? invalid ? 'var(--focus-ring-danger)' : 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...textareaStyle
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: invalid ? 'var(--text-danger)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/extension/PopupApp.jsx
try { (() => {
/* Copia e Cola — extension popup (interactive recreation)
   Composes the design-system primitives from the global namespace. */
const DS = window.CopiaEColaDesignSystem_b68b1c;
const {
  DomainHeader,
  ClipboardItem,
  SearchInput,
  Input,
  Textarea,
  Button,
  IconButton,
  EmptyState,
  Toast,
  Badge,
  Icon
} = DS;
const SEED = [{
  id: 'd1',
  scope: 'domain',
  title: 'Saudação inicial',
  favorite: true,
  content: 'Olá! Tudo bem? Sou da equipe e já vou te ajudar por aqui. Pode me contar o que você precisa?',
  meta: 'Copiado há 2 dias'
}, {
  id: 'd2',
  scope: 'domain',
  title: 'Pedido de documentos',
  favorite: false,
  content: 'Para dar andamento, preciso de: RG, CPF e comprovante de residência atualizado. Pode enviar por aqui mesmo.',
  meta: 'Copiado há 5 dias'
}, {
  id: 'd3',
  scope: 'domain',
  title: 'Encerramento do atendimento',
  favorite: false,
  content: 'Fico à disposição! Qualquer dúvida, é só chamar por aqui. Tenha um ótimo dia.',
  meta: 'Criado há 1 semana'
}, {
  id: 'g1',
  scope: 'global',
  title: 'Pedido de protocolo',
  favorite: false,
  content: 'Por gentileza, me informe o número de protocolo para que eu localize seu atendimento.',
  meta: 'Copiado há 1 semana'
}, {
  id: 'g2',
  scope: 'global',
  title: 'Dados bancários — PIX',
  favorite: true,
  content: 'Chave PIX (CNPJ): 12.345.678/0001-90 — Banco 077. Confirme o envio para liberar o serviço.',
  meta: 'Copiado ontem'
}];
function uid() {
  return 'i' + Math.random().toString(36).slice(2, 8);
}
function SectionLabel({
  children,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 2px 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-ui)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, children), typeof count === 'number' && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-muted)'
    }
  }, count));
}
function Composer({
  open,
  draft,
  onOpen,
  onChange,
  onSave,
  onCancel
}) {
  if (!open) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onOpen,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        width: '100%',
        height: 36,
        border: '1px dashed var(--border-default)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-card)',
        color: 'var(--text-brand)',
        cursor: 'pointer',
        font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-ui)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    }), " Novo item para este site");
  }
  const valid = draft.content.trim().length > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 12,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "T\xEDtulo (opcional)",
    value: draft.title,
    placeholder: "Gerado do conte\xFAdo se vazio",
    onChange: e => onChange({
      ...draft,
      title: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Conte\xFAdo",
    value: draft.content,
    rows: 3,
    placeholder: "Cole aqui o texto que voc\xEA reutiliza",
    onChange: e => onChange({
      ...draft,
      content: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "check",
    disabled: !valid,
    onClick: onSave,
    style: {
      flex: 1
    }
  }, draft.id ? 'Salvar alterações' : 'Salvar'), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onCancel
  }, "Cancelar")));
}
function Settings({
  count,
  onBack,
  toast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 12px',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left",
    label: "Voltar",
    onClick: onBack
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading)',
      color: 'var(--text-strong)'
    }
  }, "Configura\xE7\xF5es")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: 12,
      borderRadius: 'var(--radius-md)',
      background: 'var(--green-50)',
      border: '1px solid var(--green-100)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 20,
    style: {
      color: 'var(--text-brand)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-ui)',
      color: 'var(--green-900)'
    }
  }, "Seus dados ficam neste navegador"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      font: 'var(--fw-regular) var(--text-xs)/1.45 var(--font-ui)',
      color: 'var(--text-brand)'
    }
  }, "Local-first por padr\xE3o. Nada \xE9 enviado para servidores."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, null, "Backup"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "download",
    onClick: () => toast('success', 'download', 'Backup exportado (JSON)'),
    style: {
      flex: 1
    }
  }, "Exportar JSON"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "upload",
    onClick: () => toast('success', 'upload', 'Itens importados'),
    style: {
      flex: 1
    }
  }, "Importar JSON"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 4,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-muted)'
    }
  }, count, " itens salvos"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-muted)'
    }
  }, "v0.1.0"))));
}
function PopupApp({
  domain = 'web.whatsapp.com'
}) {
  const [items, setItems] = React.useState(SEED);
  const [query, setQuery] = React.useState('');
  const [composer, setComposer] = React.useState(false);
  const [draft, setDraft] = React.useState({
    title: '',
    content: ''
  });
  const [view, setView] = React.useState('list'); // 'list' | 'settings'
  const [copiedId, setCopiedId] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const flash = (tone, icon, msg) => {
    setToast({
      tone,
      icon,
      msg,
      k: Date.now()
    });
    setTimeout(() => setToast(t => t && t.k ? null : t), 1700);
  };
  const q = query.trim().toLowerCase();
  const match = it => !q || it.title.toLowerCase().includes(q) || it.content.toLowerCase().includes(q);
  const domainItems = items.filter(i => i.scope === 'domain' && match(i));
  const globalItems = items.filter(i => i.scope === 'global' && match(i));
  const openNew = () => {
    setDraft({
      title: '',
      content: ''
    });
    setComposer(true);
  };
  const saveDraft = () => {
    const title = draft.title.trim() || draft.content.trim().split('\n')[0].slice(0, 32);
    if (draft.id) {
      setItems(items.map(i => i.id === draft.id ? {
        ...i,
        title,
        content: draft.content
      } : i));
      flash('neutral', 'check', 'Alterações salvas');
    } else {
      setItems([{
        id: uid(),
        scope: 'domain',
        title,
        content: draft.content,
        favorite: false,
        meta: 'Agora mesmo'
      }, ...items]);
      flash('success', 'check-circle', 'Item salvo');
    }
    setComposer(false);
    setDraft({
      title: '',
      content: ''
    });
  };
  const editItem = it => {
    setDraft({
      id: it.id,
      title: it.title,
      content: it.content
    });
    setComposer(true);
  };
  const delItem = id => {
    setItems(items.filter(i => i.id !== id));
    flash('danger', 'trash', 'Item excluído');
  };
  const copyItem = it => {
    setCopiedId(it.id);
    flash('success', 'copy', 'Copiado para a área de transferência');
    setTimeout(() => setCopiedId(c => c === it.id ? null : c), 1300);
  };
  const toggleFav = id => setItems(items.map(i => i.id === id ? {
    ...i,
    favorite: !i.favorite
  } : i));
  const renderItem = it => /*#__PURE__*/React.createElement(ClipboardItem, {
    key: it.id,
    title: it.title,
    content: it.content,
    scope: it.scope,
    favorite: it.favorite,
    meta: it.meta,
    copied: copiedId === it.id,
    onCopy: () => copyItem(it),
    onEdit: () => editItem(it),
    onDelete: () => delItem(it.id),
    onToggleFavorite: () => toggleFav(it.id)
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 'var(--popup-width)',
      maxHeight: 580,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-canvas)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-hairline)'
    }
  }, view === 'settings' ? /*#__PURE__*/React.createElement(Settings, {
    count: items.length,
    onBack: () => setView('list'),
    toast: flash
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DomainHeader, {
    domain: domain,
    count: items.filter(i => i.scope === 'domain').length,
    onSettings: () => setView('settings')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: query,
    onChange: e => setQuery(e.target.value),
    onClear: () => setQuery(''),
    placeholder: "Buscar por t\xEDtulo ou conte\xFAdo"
  }), /*#__PURE__*/React.createElement(Composer, {
    open: composer,
    draft: draft,
    onOpen: openNew,
    onChange: setDraft,
    onSave: saveDraft,
    onCancel: () => {
      setComposer(false);
      setDraft({
        title: '',
        content: ''
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 12px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, domainItems.length === 0 && globalItems.length === 0 ? q ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search",
    title: "Nenhum item encontrado",
    description: 'Nada corresponde a "' + query + '".'
  }) : /*#__PURE__*/React.createElement(EmptyState, {
    title: "Nenhum item salvo para este site ainda",
    description: "Cole um texto, d\xEA um t\xEDtulo opcional e salve para reutilizar aqui.",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      icon: "plus",
      onClick: openNew
    }, "Salvar primeiro item")
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, {
    count: domainItems.length
  }, "Itens deste site"), domainItems.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, domainItems.map(renderItem)) : /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 2px 4px',
      font: 'var(--type-body)',
      color: 'var(--text-muted)'
    }
  }, "Nenhum item para ", domain, "."), globalItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, {
    count: globalItems.length
  }, "Itens globais"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, globalItems.map(renderItem))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      borderTop: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 13,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-muted)',
      flex: 1
    }
  }, "Salvo localmente neste navegador"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setView('settings'),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-brand)',
      font: 'var(--fw-semibold) var(--text-2xs)/1 var(--font-ui)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-wide)',
      cursor: 'pointer'
    }
  }, "Backup"))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 14,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    icon: toast.icon
  }, toast.msg)));
}
window.PopupApp = PopupApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/extension/PopupApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ClipboardItem = __ds_scope.ClipboardItem;

__ds_ns.DomainHeader = __ds_scope.DomainHeader;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
