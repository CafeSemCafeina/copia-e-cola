Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

Single-line text field — primarily the optional title on a saved item.

```jsx
<Input label="Título (opcional)" placeholder="Gerado do conteúdo se vazio"
  value={title} onChange={e => setTitle(e.target.value)} />
```

`label`, `hint`, `invalid` (red state), `mono`. The whole control is a `<label>`, so the label is clickable. For multi-line content use `Textarea`.
