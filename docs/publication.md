# Publicação

Data da decisão: 2026-06-20
Depends on: docs/repository-boundaries.md; specs/011-chrome-web-store-assets.md; specs/012-landing-page-publica.md
Decisor: David Fiocchi

Este repositório está preparado para duas publicações separadas: a landing page pública e a extensão para Chrome/Edge.

## Versão atual

- Produto: Copia e Cola.
- Versão: `0.1.0`.
- Build publicável da extensão: `dist/`, gerado por `npm run build`.
- Pacote de upload da extensão: `dist/copia-e-cola-0.1.0-chrome.zip`, gerado por `npm run package`.
- Landing page publicável: `site/`.

## Checklist final local

```powershell
npm install
npm run publish:ready
```

Esse comando executa testes, build, validação da extensão, validação de assets de publicação, smoke test em navegador Chromium/Chrome e empacotamento zip via WXT.

## GitHub Pages

O workflow `.github/workflows/pages.yml` publica a pasta `site/` no GitHub Pages quando houver push na branch `main`.

Antes do primeiro deploy, confirme no GitHub:

1. Repository Settings > Pages.
2. Source: GitHub Actions.
3. Rodar o workflow `Pages` manualmente ou fazer push em `main`.

## Vercel ou Netlify

Também é possível publicar sem build:

- Publish directory: `site`.
- Build command: vazio.
- Install command: vazio.

## Chrome Web Store

1. Rode `npm run publish:ready`.
2. Use o zip gerado em `dist/` para upload no painel da Chrome Web Store.
3. Use `store/listing/pt-BR.md` como ficha.
4. Use os assets de `store/icons/`, `store/screenshots/` e `store/promotional/`.
5. Informe `https://cafesemcafeina.github.io/copia-e-cola/privacy.html` como URL pública da política de privacidade.

### Aba Privacy do painel

Preencha a aba de privacidade do dashboard de acordo com o manifesto real da extensão:

- Declarar que a extensão usa `activeTab`, `storage`, `host_permissions: ["<all_urls>"]` e content script em `matches: ["<all_urls>"]`.
- Explicar que `storage` guarda localmente textos, títulos, domínio/contexto, comando opcional, fixado e datas operacionais.
- Explicar que `activeTab` identifica o domínio da aba atual quando o popup é aberto.
- Explicar que o acesso a sites e o content script amplo existem para detectar comandos digitados em campos editáveis de páginas compatíveis e substituir o comando por texto salvo localmente.
- Declarar que não há conta, nuvem, analytics, telemetria, venda ou compartilhamento de dados.
- Declarar que a extensão não transmite o conteúdo da página, textos salvos ou textos digitados para servidores.
- Revisar se as respostas do dashboard continuam compatíveis com a política pública antes de enviar para revisão.

Depois da aprovação na loja, substitua o CTA da landing pelo link público da Chrome Web Store.
