import React from 'react';

/* Curated Lucide-style icon set (stroke 2, 24px grid, currentColor).
   Copia e Cola uses line icons exclusively — clean, utilitarian,
   consistent 2px stroke. Add new glyphs to PATHS as needed. */
const PATHS = {
  copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></>,
  check: <path d="M20 6 9 17l-5-5"/>,
  'check-circle': <><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"/>,
  pencil: <><path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M13.5 6.5l3 3"/></>,
  trash: <><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/></>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  x: <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></>,
  download: <><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></>,
  upload: <><path d="M12 20V9"/><path d="m7 13 5-5 5 5"/><path d="M5 4h14"/></>,
  'more-horizontal': <><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  'shield-check': <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/></>,
  'arrow-left': <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
  filter: <path d="M3 5h18l-7 8v5l-4 2v-7z"/>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-2-3.4-1.9.8a7.6 7.6 0 0 0-2.6-1.5L14.3 2H9.7l-.3 2.2a7.6 7.6 0 0 0-2.6 1.5l-1.9-.8-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L3 14.7l2 3.4 1.9-.8a7.6 7.6 0 0 0 2.6 1.5L9.7 22h4.6l.3-2.2a7.6 7.6 0 0 0 2.6-1.5l1.9.8 2-3.4z"/></>,
  inbox: <><path d="M3 12h5l1.5 2.5h5L16 12h5"/><path d="M5 5h14l2 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/></>,
};

export function Icon({ name, size = 18, strokeWidth = 2, className = '', style = {}, ...rest }) {
  const path = PATHS[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'block', flexShrink: 0, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {path || null}
    </svg>
  );
}
