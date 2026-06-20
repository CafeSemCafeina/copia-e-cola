Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

Primary action control — use for Salvar, Copiar, Importar, and any committed action; emerald `primary` for the main action per view.

```jsx
<Button variant="primary" icon="check">Salvar</Button>
<Button variant="secondary" icon="upload">Importar</Button>
<Button variant="danger" icon="trash">Excluir</Button>
```

Variants: `primary` (brand, one per view), `secondary` (neutral outline), `ghost` (low-emphasis), `danger` (destructive). Sizes `sm | md | lg`. Icons are referenced by name (`icon` / `iconRight`) and drawn via the Icon set. Use `fullWidth` for the save action in the compact popup.
