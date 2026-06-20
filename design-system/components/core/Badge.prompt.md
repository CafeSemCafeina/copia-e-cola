Data da decisão: 2026-06-20
Depends on: design-system/README.md; design-system/ASSET_LICENSE.md
Decisor: David Fiocchi

Small pill for counts and statuses. `global` (blue) = cross-site item, `amber` = favorite, `mono` for a literal domain value.

```jsx
<Badge tone="global" icon="globe">Global</Badge>
<Badge tone="amber" icon="star">Favorito</Badge>
<Badge tone="neutral" mono>web.whatsapp.com</Badge>
```

Tones: `neutral`, `brand`, `global`, `amber`, `danger`. Uppercase + tracked by default; `mono` switches to lowercase monospace for machine values.
