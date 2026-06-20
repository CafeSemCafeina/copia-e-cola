# Copia e Cola — Design System

A complete brand and UI design system for **Copia e Cola**, an open-source, local-first browser extension that stores and reuses text by context. Open a site (WhatsApp Web, a court portal, a CRM, an internal tool) and the extension shows only the texts, prompts, protocols and templates saved for that domain — a smart, per-site clipboard.

This repository is the source of truth for the brand: tokens, fonts, reusable React components, foundation specimens, and a high-fidelity recreation of the extension popup.

---

## Product context

- **What it is:** a Manifest-V3 browser extension. A compact popup, opened dozens of times a day, to save a snippet, give it an optional title, and copy it back with one click.
- **Who it's for:** Brazilian professionals who live in the browser copying recurring text between systems — legal secretaries, solo lawyers, admin assistants, sales/CRM operators, small teams.
- **Principles:** local-first (data stays in the user's browser by default), open-source, "simple before smart" (solve copy/paste before AI/sync/collab), Brazil-first contexts.
- **Core popup UX:** header with the current domain · title field · content field · **Salvar** · simple search · list of items for the current site · global items · copy / edit / delete · clear empty states · JSON export/import.

### Sources used to build this system

- **GitHub:** https://github.com/CafeSemCafeina/copia-e-cola — product README + `specs/` (001–007). The system was built from these specs (especially `005-popup-ux.md`, `004-crud-de-itens.md`, `002-contexto-por-dominio.md`); the repo had **no UI code, fonts, logos, or visual design** at the time, so the visual language here is an original, brief-driven interpretation. Explore the repo further to refine product behavior.
- No Figma or codebase UI was provided. **Fonts are Google Fonts substitutions** (see Caveats).

---

## CONTENT FUNDAMENTALS

The product voice is **direct, operational Brazilian Portuguese** — it reads like a tool, not a marketing site.

- **Verbs, imperative, infinitive.** Actions are bare verbs: `Salvar`, `Copiar`, `Editar`, `Excluir`, `Buscar`. No "Clique aqui para salvar seu item".
- **"Você", never "nós da equipe".** Speak to the user plainly. No corporate first-person plural.
- **No marketing, no hype, no "IA mágica".** Avoid SaaS jargon and AI buzzwords. The product earns trust by being fast and private, not by claiming intelligence.
- **No emoji.** Iconography is line icons only (see below).
- **Sentence case** for UI copy; **UPPERCASE micro-labels** only for section eyebrows (`ITENS DESTE SITE`, `ITENS GLOBAIS`), tracked `+0.02em`.
- **Empty states orient in one line**, never a wall of text: e.g. *"Nenhum item salvo para este site ainda."* with one supporting sentence and an optional CTA.
- **Privacy is stated plainly, not sold:** *"Salvo localmente neste navegador."* / *"Seus dados ficam neste navegador. Local-first por padrão. Nada é enviado para servidores."*
- **Metadata is concrete and Brazilian:** *"Copiado há 2 dias"*, *"Criado há 1 semana"*, *"Agora mesmo"*.
- **Domains are shown literally** in monospace: `web.whatsapp.com · 14 itens`.

Canonical vocabulary: `Salvar · Copiar · Editar · Excluir · Buscar · Itens deste site · Itens globais · Novo item para este site · Salvar primeiro item · Exportar JSON · Importar JSON`.

---

## VISUAL FOUNDATIONS

The vibe is **clean, light, trustworthy, utilitarian, modern** — a fast tool, not a heavy SaaS dashboard. No dark theme, no exaggerated gradients, no generic SaaS purple, no hero illustrations.

**Color.** Pine-green primary (`--green-500 #1b8a5e`) signals confirmation, privacy, and a quiet nod to Brazil — it doubles as the "copy/success" color. Surfaces are **warm paper** off-whites (`--paper-50 #faf9f5` canvas, `#ffffff` cards), not cool grays. Text is **warm ink** (`--ink-900 #1c1b17` strong → `--ink-500` muted). Accents are purposeful and rare: **amber** (`--amber-400 #e0a330`) for favorites only, **red** (`--red-500 #cf4137`) for destructive only, **blue** (`--blue-600 #2459ad`) for global/cross-site items and links. One green, one warm-neutral family, three single-purpose accents.

**Type.** UI is **Hanken Grotesk** (warm grotesk, legible, a little personality). Saved content, domains and metadata are **IBM Plex Mono** — mono reads as literal, machine-precise text you copy and paste. Compact scale tuned for a ~360px popup: body baseline `--text-sm 13px`, sizes `11 · 12 · 13 · 14 · 16 · 18 · 22 · 28 · 36`. Display weights 700 with `-0.014em` tracking; UI weights 400–600.

**Spacing.** 4px base grid, compact density (`--space-1 2px` … `--space-10 32px`). Popup width `--popup-width 360px`. The product is information-dense but never cramped — generous line-height (`1.5`) on body, tight gaps between controls.

**Backgrounds.** Flat warm paper. The only "image" treatment is a single faint radial wash behind the faux-browser scene in the UI kit (`radial-gradient(... #eef4ef ...)`) — decorative, never on product surfaces. No textures, no full-bleed photography, no hand-drawn illustration.

**Corner radii.** Small and crisp: `xs 4 · sm 6 (inputs, chips) · md 8 (buttons, item cards) · lg 12 (popup, panels) · pill 999`.

**Shadows.** Soft, low, warm-ink-tinted — never glowy. `xs` (resting cards) → `sm` (hover) → `md` → `lg` (popup, toasts). Sunken fields can use `--shadow-inset`. Elevation is subtle; borders do most of the structural work.

**Borders.** Hairlines carry the layout. `--border-hairline #e3dfd5` for dividers and quiet edges; `--border-default #d4cfc2` for inputs and outlined buttons; `--border-focus` (green) on focus.

**Cards.** White surface, `md` radius, 1px hairline border at rest with `shadow-xs`; on hover the border darkens to `--border-default` and shadow lifts to `sm`. The whole item card is the copy affordance (cursor pointer); edit/delete reveal on hover; the favorite star toggles inline.

**Hover / press.** Hover: a step-darker brand (`--brand-hover`) or a neutral paper fill (`--surface-hover`); icon buttons gain a soft tinted background matching their tone. Press: one more step darker (`--brand-press`) plus a 0.5px downward nudge on buttons. Quick and physical, never bouncy.

**Focus.** Visible 3px ring: `--focus-ring` (green) for normal fields, `--focus-ring-danger` (red) for invalid.

**Motion.** Quick and functional — a tool you open dozens of times a day should feel instant. `--ease-out` for nearly everything; durations `instant 80ms · fast 130ms (hover/press/copy) · base 200ms (toast, expand) · slow 300ms`. Fades and small (≤6px) slides only. No spring, no bounce, no decorative looping animation. Respects `prefers-reduced-motion`.

**Transparency / blur.** Essentially none — surfaces are opaque paper. Confidence comes from solid, legible fills, not glass.

**Imagery vibe.** Warm, light, neutral. If real screenshots are ever shown, keep them on warm paper mounts with hairline borders.

---

## ICONOGRAPHY

- **A single built-in line-icon set** lives in `components/core/Icon.jsx` — curated, Lucide-style, **2px stroke on a 24px grid, `currentColor`, round caps/joins**. There is no icon font and no per-icon SVG files; glyphs are inline `<path>` data keyed by name, drawn through the `Icon` component (`<Icon name="copy" size={16} />`). All other components (Button, IconButton, Badge, Toast, ClipboardItem, DomainHeader) reference icons **by name**, never by raw SVG.
- **Available names:** `copy · check · check-circle · search · star · pencil · trash · plus · x · globe · download · upload · more-horizontal · lock · shield-check · arrow-left · filter · settings · inbox`. Add new glyphs by extending the `PATHS` map in `Icon.jsx`.
- **Semantics:** `copy` is the hero action; `star` = favorite (amber when active); `trash` = destructive (red); `globe` = global/cross-site; `lock` / `shield-check` = the local-first / privacy story; `settings` opens backup.
- **No emoji, ever.** No Unicode pictographs as icons. The `✓ / ✕` marks in the voice card are typographic do/don't markers, not product UI.
- This icon style was chosen to match the utilitarian, professional tone; it is an original set inspired by the Lucide stroke convention (no upstream icon library is bundled).

---

## VISUAL ASSETS

- `assets/logomark.svg` — the logomark: two offset rounded squares (a "source → context" copy metaphor) in pine green.
- `assets/wordmark.svg` — horizontal logo lockup ("Copia e **Cola**", the second word in green).

Use the logomark in a `--green-50` soft tile (as in the popup header) or reversed white on `--green-700`. Keep clear space ≈ the mark's corner radius.

---

## INDEX — what's in this repo

**Foundations**
- `styles.css` — global entry point (consumers link this one file; `@import` list only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `motion.css`, `base.css`.
- `guidelines/` — foundation specimen cards (render in the Design System tab): `color-green`, `color-ink`, `color-paper`, `color-semantic`, `type-families`, `type-scale`, `spacing-scale`, `radii-shadows`, `brand-logo`, `brand-voice`.

**Components** (`components/<group>/` — React, exported on `window.CopiaEColaDesignSystem_b68b1c`)
- `core/` — `Icon`, `Button`, `IconButton`, `Badge` (card: `core.card.html`)
- `forms/` — `Input`, `Textarea`, `SearchInput` (card: `forms.card.html`)
- `clipboard/` — `ClipboardItem`, `DomainHeader` (card: `clipboard.card.html`)
- `feedback/` — `EmptyState`, `Toast` (card: `feedback.card.html`)

**UI kit**
- `ui_kits/extension/` — `index.html` (interactive popup over a faux browser) + `PopupApp.jsx` (composes the primitives: list, search, composer/save, global section, settings/backup, toasts, empty states).

**Meta**
- `SKILL.md` — Agent-Skill front matter so this system can be used in Claude Code.
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — generated by the compiler; do not edit by hand.

---

## CAVEATS

- **Fonts are substitutions.** No brand fonts were provided, so the system uses **Hanken Grotesk** (UI) and **IBM Plex Mono** (mono) from Google Fonts, loaded via `@import` in `tokens/fonts.css`. If real brand fonts exist, drop the `.woff2` files in `assets/fonts/` and swap the import for local `@font-face` rules.
- **Logos are original.** No logo was supplied; the mark and wordmark here are a first proposal, not an approved brand asset.
- **Icons are an original set**, inspired by the Lucide stroke convention — not a bundled third-party library.
