# Slash Command Expander Design

Data da decisão: 2026-06-20
Depends on: docs/PRD.md; docs/adr/0003-product-packaging-and-pricing.md
Decisor: David Fiocchi

## Goal

Add the first Text Blaze-like behavior to Copia e Cola: a saved item can optionally become a slash command, and typing that command in a supported browser text field immediately replaces the command with the item's fixed content.

This MVP does not include AI, prompt transformation, sync, agents, variables, rich snippets, or pipeline syntax. It validates the core behavior: "type a slash command where you are already writing and get reusable text inserted in place."

## Product Behavior

Items remain local-first and keep the current domain/global model:

- Domain items expand only on their saved domain.
- Global items expand on any supported site.
- Domain and global items share the same effective command namespace for a given domain.

The item composer adds an optional command mode:

- A toggle labeled "Usar como comando".
- A short hover tooltip explaining that the item content will replace the command when typed in text fields.
- A visible editable command field when the toggle is enabled.
- A suggested trigger generated from the title when command mode is enabled.

Example:

```text
Title: Data de hoje
Suggested command: /data-de-hoje
Content: 20/06/2026
```

The user may edit the suggestion, for example to `/data`.

## Data Model

Extend `ClipboardItem` with command fields:

```ts
type ClipboardItem = {
  id: string;
  scope: ItemScope;
  domain: string | null;
  title: string;
  content: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  lastCopiedAt: string | null;
  commandEnabled: boolean;
  commandTrigger: string | null;
};
```

Existing items normalize to:

```ts
commandEnabled: false
commandTrigger: null
```

This keeps old local storage and JSON backups readable without a destructive migration.

## Trigger Rules

The MVP uses immediate expansion for fixed snippets. When a supported field's text before the cursor ends with a known command, the command is replaced immediately by the saved content.

Validation rules:

- A trigger is required only when `commandEnabled` is true.
- A trigger must start with `/`.
- After `/`, allow letters, numbers, `_`, and `-`.
- No spaces.
- No empty command body, so `/` alone is invalid.
- Triggers are case-insensitive for validation and matching.
- Exact duplicates are forbidden within the same effective context.
- Prefix conflicts are also forbidden within the same effective context.

Prefix conflict examples:

```text
/email
/email-syntelix
```

These cannot coexist if they can both apply on the same domain, because immediate expansion would replace `/email` before the user finishes typing `/email-syntelix`.

Allowed examples:

```text
Global: /email
Domain A: /docs
Domain B: /docs
```

Forbidden examples:

```text
Global: /docs
Domain A: /docs

Global: /email
Domain A: /email-syntelix

Domain A: /email
Domain A: /email-syntelix
```

Future work may add delimiter or word-break triggering so prefix-related commands can coexist. That is intentionally out of scope for this MVP.

## Architecture

Use a shared core plus a small content script.

### `src/lib/slash-commands.ts`

Responsibilities:

- Generate command suggestions from titles.
- Normalize triggers for comparison.
- Validate trigger format.
- Detect exact and prefix conflicts.
- Resolve commands applicable to a domain from all stored items.

This file should be pure and unit-tested.

### `src/lib/text-expansion.ts`

Responsibilities:

- Given text before the cursor and applicable commands, find a matching command suffix.
- Prefer exact matching through the no-prefix-conflict invariant.
- Return the replacement range and replacement text for simple text buffers.
- Avoid DOM APIs so matching logic remains easy to test.

### `entrypoints/content.ts`

Responsibilities:

- Run as a WXT content script on supported pages.
- Listen to user input in supported editable fields.
- Load applicable commands from `chrome.storage.local`.
- Detect command matches near the cursor.
- Replace only the typed command with the item content.
- Dispatch an `input` event after replacement so frameworks can observe the change.

### Existing UI and Storage

- `src/lib/storage.ts` normalizes the new command fields.
- Popup and options composers render the command toggle, tooltip, trigger field, and validation errors.
- Backup/export includes the new fields naturally because item objects remain JSON serializable.

## Supported Fields

The MVP supports:

- `input` text-like fields.
- `textarea`.
- Basic `contenteditable`.

The MVP excludes:

- `password`, `email`, `number`, `date`, and other non-text expansion field types.
- `readonly` and `disabled` fields.
- Browser internal pages.
- Google Docs and other highly custom editors that do not expose a reliable editable text range.

### `input` and `textarea`

Use:

- `selectionStart`
- `selectionEnd`
- `setRangeText`
- synthetic bubbling `input` event

The replacement range is the typed command only.

Example:

```text
Before: Hoje é /data
After:  Hoje é 20/06/2026
```

### Basic `contenteditable`

Use the browser selection and range APIs for the active text node/block. If the selection or range cannot be mapped safely, do nothing.

The MVP should favor non-destructive behavior over risky mutation in complex editors.

## Error Handling

UI validation blocks saving command-enabled items when:

- the trigger is missing;
- the trigger format is invalid;
- another applicable item has the same trigger;
- another applicable item has a prefix conflict.

Runtime expansion should fail silently when:

- storage is unavailable;
- the active field is unsupported;
- the selection is not usable;
- no applicable command matches;
- the current page cannot be associated with a valid domain.

Silent runtime failure is acceptable because the user should keep normal typing behavior.

## Testing Plan

Tests are part of the MVP, not a later cleanup.

### Unit Tests

Cover command rules:

- `suggestCommandTrigger("Data de hoje")` returns `/data-de-hoje`.
- Valid triggers pass: `/data`, `/email_syntelix`, `/email-syntelix`.
- Invalid triggers fail: `/`, `data`, `/email syntelix`, `/email!`.
- Exact duplicates conflict.
- Global/domain duplicate conflicts when both apply to the same domain.
- Prefix conflicts are detected in both directions.
- Same trigger is allowed across different domains when there is no global conflict.
- Applicable commands resolve correctly for domain and global items.

Cover text matching:

- Text ending in a known trigger returns a replacement.
- Unknown command returns no replacement.
- Matching is case-insensitive if command normalization is case-insensitive.
- Only the command suffix is marked for replacement.
- Text after the cursor is preserved by the range calculation.

### DOM Expansion Tests

Simulate the field types the MVP supports:

- `textarea`: `Hoje é /data` becomes `Hoje é 20/06/2026`.
- `input type="text"`: `Contato: /email` becomes `Contato: contato@empresa.com`.
- Basic `contenteditable`: `Olá /oi` becomes `Olá Olá, tudo bem?`.
- Replacement preserves text after the cursor.
- Replacement only removes the trigger, not the previous sentence.
- No replacement in `password`, `readonly`, or `disabled` fields.
- An `input` event is dispatched after successful replacement.

### Integration and Smoke

The existing check gate should continue to pass:

```powershell
npm run check
```

The browser smoke test should be extended or accompanied by a focused content-script smoke test that:

- preloads storage with command-enabled items;
- opens a local test page with `input`, `textarea`, and `contenteditable`;
- types slash commands into each field;
- verifies the rendered text after expansion;
- verifies domain/global behavior.

## Acceptance Criteria

The MVP is complete when:

- A user can create or edit an item and enable "Usar como comando".
- The UI suggests a command from the title and allows editing it.
- The tooltip explains the command behavior succinctly on hover.
- Invalid, duplicate, and prefix-conflicting triggers are blocked with a clear message.
- Domain-scoped commands expand only on their domain.
- Global commands expand on any supported domain.
- Typing a known command in `input`, `textarea`, or basic `contenteditable` replaces only the command with fixed item content.
- Unsupported fields keep normal browser behavior.
- Unit and DOM tests cover the core command scenarios.

## Out of Scope

- AI text transformation.
- Slash command modifiers such as `/*`, `/&`, `/%`, `/#`, `/$`, `/@`.
- Delimiter or word-break trigger modes.
- Command pipelines.
- Variables.
- Rich text insertion.
- Sync, login, and cloud backup.
- Site-specific adapters for Gmail, WhatsApp Web, Google Docs, Notion, or CRMs.
