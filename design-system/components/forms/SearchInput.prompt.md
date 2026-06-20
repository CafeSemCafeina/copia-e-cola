Compact local filter for the popup item list — searches title and content. Shows a clear (×) button once typed in.

```jsx
<SearchInput value={q} onChange={e => setQ(e.target.value)} onClear={() => setQ('')}
  placeholder="Buscar por título ou conteúdo" />
```

Sits on the sunken paper fill; emerald focus ring. Filtering is the consumer's job (`onChange`).
