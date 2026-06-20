Compact icon-only control for per-item actions — copiar, editar, excluir, favoritar. Always pass a `label`.

```jsx
<IconButton icon="pencil" label="Editar" />
<IconButton icon="trash" tone="danger" label="Excluir" />
<IconButton icon="star" tone="favorite" active label="Favorito" />
```

Tones: `neutral`, `brand`, `danger` (red on hover), `favorite` (amber; `active` fills the star). Sizes `sm | md | lg`.
