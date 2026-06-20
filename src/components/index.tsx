import React from "react";
import type { ClipboardItem } from "../types";

type IconName =
  | "copy"
  | "check"
  | "check-circle"
  | "search"
  | "star"
  | "pin"
  | "pencil"
  | "trash"
  | "plus"
  | "x"
  | "globe"
  | "download"
  | "upload"
  | "more-horizontal"
  | "lock"
  | "shield-check"
  | "arrow-left"
  | "filter"
  | "settings"
  | "inbox";

const PATHS: Record<IconName, React.ReactNode> = {
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  "check-circle": <><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z" />,
  pin: <><path d="M12 17v5" /><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" /></>,
  pencil: <><path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17z" /><path d="M13.5 6.5l3 3" /></>,
  trash: <><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  x: <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>,
  download: <><path d="M12 4v11" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" /></>,
  upload: <><path d="M12 20V9" /><path d="m7 13 5-5 5 5" /><path d="M5 4h14" /></>,
  "more-horizontal": <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  "shield-check": <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  "arrow-left": <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  filter: <path d="M3 5h18l-7 8v5l-4 2v-7z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-2-3.4-1.9.8a7.6 7.6 0 0 0-2.6-1.5L14.3 2H9.7l-.3 2.2a7.6 7.6 0 0 0-2.6 1.5l-1.9-.8-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L3 14.7l2 3.4 1.9-.8a7.6 7.6 0 0 0 2.6 1.5L9.7 22h4.6l.3-2.2a7.6 7.6 0 0 0 2.6-1.5l1.9.8 2-3.4z" /></>,
  inbox: <><path d="M3 12h5l1.5 2.5h5L16 12h5" /><path d="M5 5h14l2 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" /></>
};

export function Icon({ name, size = 18, strokeWidth = 2, className = "", style }: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
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
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="brand-mark__glyph">
        <span className="brand-mark__back" />
        <span className="brand-mark__front" />
      </span>
    </div>
  );
}

export function IconButton({ icon, label, tone = "neutral", active = false, size = "md", onClick, id, className = "" }: {
  icon: IconName;
  label: string;
  tone?: "neutral" | "brand" | "danger" | "favorite";
  active?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  className?: string;
}) {
  return (
    <button
      id={id}
      className={`icon-button icon-button--${size} icon-button--${tone}${active ? " is-active" : ""} ${className}`}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon name={icon} size={size === "sm" ? 15 : size === "lg" ? 18 : 17} />
    </button>
  );
}

export function Button({ children, variant = "primary", size = "md", icon, fullWidth, type = "button", disabled, id, onClick, className = "" }: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  fullWidth?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      id={id}
      className={`button button--${variant} button--${size}${fullWidth ? " button--full" : ""} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 15 : size === "lg" ? 18 : 17} /> : null}
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral", icon, mono }: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "global" | "amber" | "danger";
  icon?: IconName;
  mono?: boolean;
}) {
  return (
    <span className={`badge badge--${tone}${mono ? " badge--mono" : ""}`}>
      {icon ? <Icon name={icon} size={11} strokeWidth={2.2} /> : null}
      {children}
    </span>
  );
}

export function DomainHeader({ domain, count, onSettings }: { domain: string | null; count?: number; onSettings: () => void }) {
  const unsupported = !domain;
  return (
    <header className="domain-header">
      <BrandMark />
      <div className="domain-header__text">
        <p className="eyebrow">Copia e Cola</p>
        <div className="domain-header__domain">
          <Icon name={unsupported ? "lock" : "globe"} size={13} />
          <h1>{unsupported ? "Página não suportada" : domain}</h1>
          {!unsupported && typeof count === "number" ? <span>· {count}</span> : null}
        </div>
      </div>
      <IconButton id="settings-button" icon="settings" label="Configurações" onClick={onSettings} />
    </header>
  );
}

export function SearchField({ value, placeholder, onChange, onClear, id = "search-input" }: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  id?: string;
}) {
  return (
    <label className="search-field">
      <span className="search-field__icon" aria-hidden="true"><Icon name="search" size={15} /></span>
      <span className="sr-only">Buscar</span>
      <input id={id} type="search" placeholder={placeholder} value={value} onChange={(event) => onChange(event.currentTarget.value)} />
      {onClear && value.trim() ? (
        <button id="clear-search-button" className="clear-search-button" type="button" aria-label="Limpar busca" onClick={onClear}>
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </label>
  );
}

export function EmptyState({ title, body, icon = "inbox", action }: {
  title: string;
  body?: string;
  icon?: IconName;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon"><Icon name={icon} size={22} strokeWidth={1.8} /></div>
      <strong>{title}</strong>
      {body ? <span>{body}</span> : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}

export function Toast({ message, tone = "success", icon }: { message: string; tone?: "success" | "neutral" | "danger"; icon?: IconName }) {
  if (!message) return null;
  const fallbackIcon: Record<string, IconName> = { success: "check-circle", neutral: "check", danger: "x" };
  return (
    <div className="toast-wrap">
      <div className={`toast toast--${tone}`} role="status" aria-live="polite">
        <Icon name={icon || fallbackIcon[tone]} size={16} strokeWidth={2.4} />
        {message}
      </div>
    </div>
  );
}

function formatMeta(item: ClipboardItem, copied?: boolean) {
  if (copied) return "Copiado";
  const date = new Date(item.lastCopiedAt || item.updatedAt);
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  if (days === 0) return item.lastCopiedAt ? "Copiado agora" : "Criado agora";
  if (days === 1) return item.lastCopiedAt ? "Copiado ontem" : "Criado ontem";
  if (days >= 14 && days < 21) return item.lastCopiedAt ? "Copiado há 2 semanas" : "Criado há 2 semanas";
  if (days >= 7) return item.lastCopiedAt ? "Copiado há 1 semana" : "Criado há 1 semana";
  return item.lastCopiedAt ? `Copiado há ${days} dias` : `Criado há ${days} dias`;
}

export function ClipboardItemCard({ item, copied, onCopy, onFavorite, onEdit, onDelete }: {
  item: ClipboardItem;
  copied?: boolean;
  onCopy: (item: ClipboardItem) => void;
  onFavorite: (id: string) => void;
  onEdit: (item: ClipboardItem) => void;
  onDelete: (item: ClipboardItem) => void;
}) {
  return (
    <article className={`clipboard-item${copied ? " clipboard-item--copied" : ""}${item.favorite ? " clipboard-item--favorite" : ""}`} data-id={item.id}>
      <div className="clipboard-item__copy" role="button" tabIndex={0} onClick={() => onCopy(item)} onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onCopy(item);
      }}>
        <div className="clipboard-item__topline">
          <span className="clipboard-item__title">{item.title}</span>
          {item.scope === "global" ? <Badge tone="global" icon="globe">Global</Badge> : null}
          <IconButton
            className="favorite-action"
            icon="pin"
            size="sm"
            tone="favorite"
            active={item.favorite}
            label={item.favorite ? "Desafixar" : "Fixar"}
            onClick={(event) => {
              event.stopPropagation();
              onFavorite(item.id);
            }}
          />
        </div>
        <p className="clipboard-item__content">{item.content}</p>
        <div className="clipboard-item__footer">
          <span className="clipboard-item__meta">
            {copied ? <Icon name="check" size={13} strokeWidth={2.4} /> : null}
            {formatMeta(item, copied)}
          </span>
          <div className="clipboard-item__actions">
            <IconButton className="edit-action" icon="pencil" size="sm" label="Editar" onClick={(event) => {
              event.stopPropagation();
              onEdit(item);
            }} />
            <IconButton className="delete-action" icon="trash" size="sm" tone="danger" label="Excluir" onClick={(event) => {
              event.stopPropagation();
              onDelete(item);
            }} />
          </div>
          <span className="clipboard-item__copy-label"><Icon name="copy" size={13} /> Copiar</span>
        </div>
      </div>
    </article>
  );
}

export function DeleteDialog({ item, onCancel, onConfirm }: { item: ClipboardItem | null; onCancel: () => void; onConfirm: () => void }) {
  if (!item) return null;
  return (
    <section id="delete-dialog" className="dialog-backdrop">
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <p className="eyebrow">Confirmar exclusão</p>
        <h2 id="delete-title">Excluir item?</h2>
        <p id="delete-body">Excluir "{item.title}"? Essa ação remove apenas este texto salvo.</p>
        <div className="dialog__actions">
          <Button id="cancel-delete-button" variant="ghost" onClick={onCancel}>Cancelar exclusão</Button>
          <Button id="confirm-delete-button" variant="danger" onClick={onConfirm}>Confirmar exclusão</Button>
        </div>
      </div>
    </section>
  );
}

export function BackupPanel({ total, importSummary, onExport, onImport }: {
  total: number;
  importSummary?: string;
  onExport: () => void;
  onImport: (file: File | undefined) => void;
}) {
  return (
    <div className="settings-body">
      <section className="privacy-card">
        <Icon name="shield-check" size={20} />
        <div>
          <strong>Seus dados ficam neste navegador</strong>
          <p>Local-first por padrão. Nada é enviado para servidores.</p>
        </div>
      </section>
      <section className="settings-section">
        <SectionLabel>Backup</SectionLabel>
        <div className="backup-actions">
          <Button id="export-button" variant="secondary" icon="download" fullWidth onClick={onExport}>Exportar JSON</Button>
          <label className="button button--secondary button--md button--full file-button">
            <Icon name="upload" size={17} />
            Importar JSON
            <input id="import-input" type="file" accept="application/json,.json" onChange={(event) => onImport(event.currentTarget.files?.[0])} />
          </label>
        </div>
        {importSummary ? <p id="import-summary" className="import-summary">{importSummary}</p> : null}
      </section>
      <StatsPanel total={total} />
    </div>
  );
}

export function StatsPanel({ total, sites = 0, global = 0, fixed = 0 }: { total: number; sites?: number; global?: number; fixed?: number }) {
  if (sites || global || fixed) {
    return (
      <dl className="stats">
        <div><dt>Total</dt><dd id="stat-total">{total}</dd></div>
        <div><dt>Sites</dt><dd id="stat-sites">{sites}</dd></div>
        <div><dt>Globais</dt><dd id="stat-global">{global}</dd></div>
        <div><dt>Fixados</dt><dd id="stat-fixed">{fixed}</dd></div>
      </dl>
    );
  }

  return (
    <dl className="settings-stats">
      <div><dt>{total} itens salvos</dt></div>
      <div><dt>v0.1.0</dt></div>
    </dl>
  );
}

export function SectionLabel({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <div className="section-label">
      <span>{children}</span>
      {typeof count === "number" ? <span>{count}</span> : null}
    </div>
  );
}

export function FilterBar({ filters, active, onChange }: { filters: [string, string][]; active: string; onChange: (value: string) => void }) {
  function iconForFilter(value: string): IconName | null {
    if (value === "fixed") return "pin";
    if (value === "global") return "globe";
    if (value !== "all") return "filter";
    return null;
  }

  return (
    <nav id="filter-list" className="filters" aria-label="Filtros">
      {filters.map(([value, label]) => {
        const icon = iconForFilter(value);
        return (
          <button key={value} className={`filter filter--${value}`} type="button" aria-pressed={String(active === value)} onClick={() => onChange(value)}>
            {icon ? <Icon name={icon} size={14} /> : null}
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export function PageShell({ children, className }: { children: React.ReactNode; className: string }) {
  return <main className={className}>{children}</main>;
}

export function Composer() {
  return null;
}
