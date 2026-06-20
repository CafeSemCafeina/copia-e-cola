Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

Compact icon-only control for per-item actions — copiar, editar, excluir, favoritar. Always pass a `label`.

```jsx
<IconButton icon="pencil" label="Editar" />
<IconButton icon="trash" tone="danger" label="Excluir" />
<IconButton icon="star" tone="favorite" active label="Favorito" />
```

Tones: `neutral`, `brand`, `danger` (red on hover), `favorite` (amber; `active` fills the star). Sizes `sm | md | lg`.
