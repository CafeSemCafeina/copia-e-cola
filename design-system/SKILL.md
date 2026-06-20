---
name: copia-e-cola-design
description: Use this skill to generate well-branded interfaces and assets for Copia e Cola, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What Copia e Cola is
A local-first, open-source browser extension: a per-site clipboard for reusable text. Compact popup, opened dozens of times a day. Voice is direct, operational Brazilian Portuguese (verbs, no marketing, no emoji). Visual tone: clean, light, trustworthy, utilitarian — pine-green primary on warm paper, never dark/gradient/SaaS-purple.

## Where things are
- `styles.css` — link this one file to get every token + webfont.
- `tokens/` — colors, typography, spacing, radii, motion, fonts, base.
- `components/` — React primitives (`core`, `forms`, `clipboard`, `feedback`), exported on `window.CopiaEColaDesignSystem_b68b1c`. Each `<Name>.prompt.md` has usage.
- `guidelines/` — foundation specimen cards.
- `ui_kits/extension/` — full interactive popup recreation; the best reference for composing real screens.
- `assets/` — `logomark.svg`, `wordmark.svg`.

## Using components in an HTML artifact
Load React + Babel, then the bundle, then read components off the namespace:

```html
<link rel="stylesheet" href="styles.css">
<!-- React 18 + Babel standalone (pinned) -->
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, ClipboardItem, DomainHeader, SearchInput, Icon } = window.CopiaEColaDesignSystem_b68b1c;
  // ...render
</script>
```

Icons are referenced by name (`<Icon name="copy" />`), not raw SVG. Keep copy in Brazilian Portuguese, imperative, no emoji.
