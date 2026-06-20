Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

The core product object — one saved snippet. The whole card copies on click; edit and delete reveal on hover; the star toggles favorite inline.

```jsx
<ClipboardItem
  title="Saudação inicial"
  content="Olá! Tudo bem? Sou da equipe e vou te ajudar por aqui."
  scope="domain"
  meta="Copiado há 2 dias"
  favorite
  onCopy={copy} onEdit={edit} onDelete={remove} onToggleFavorite={fav}
/>
```

`scope`: `domain | global` (global shows a blue "Global" badge). Pass `copied` to flash the green "Copiado" confirmation after a copy.
