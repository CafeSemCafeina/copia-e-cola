Multi-line field for the content being saved. Defaults to monospace because items are literal text to paste back out.

```jsx
<Textarea label="Conteúdo" rows={3} placeholder="Cole aqui o texto que você reutiliza"
  value={content} onChange={e => setContent(e.target.value)} />
```

`rows`, `mono` (default true), `invalid`, `label`/`hint` like `Input`. Resizes vertically.
