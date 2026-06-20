Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

Short, self-dismissing confirmation after salvar / copiar / excluir. Pin near the bottom of the popup; the host owns the timer.

```jsx
<Toast tone="success" icon="copy">Copiado para a área de transferência</Toast>
<Toast tone="danger" icon="trash">Item excluído</Toast>
```

Tones: `success` (emerald), `neutral` (dark ink), `danger`. Each tone has a default icon; override via `icon`. Keep messages short and operational.
