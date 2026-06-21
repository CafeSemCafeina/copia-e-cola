# Checklist de validação local

Data da decisão: 2026-06-20
Depends on: docs/publication.md; specs/014-react-wxt-migration.md
Decisor: David Fiocchi

Use a pasta `dist/` como extensão sem compactação no Chrome ou Edge. Gere essa pasta antes com `npm run build`.

## Instalação

1. Abrir `chrome://extensions` ou `edge://extensions`.
2. Ativar modo desenvolvedor.
3. Clicar em "Carregar sem compactação".
4. Selecionar a pasta `dist/`.
5. Abrir a extensão em um site comum.

## Fluxos manuais

- Em `https://web.whatsapp.com`, confirmar que o topo exibe `web.whatsapp.com`.
- Salvar um item com título opcional e conteúdo obrigatório.
- Copiar o item e colar em um campo de texto, confirmando conteúdo exato.
- Editar título/conteúdo e confirmar atualização imediata.
- Excluir o item e confirmar que apenas ele saiu da lista.
- Salvar um item em um portal jurídico e confirmar que ele não aparece no WhatsApp.
- Salvar um item em uma ferramenta Syntelix e confirmar isolamento por domínio.
- Criar um item global e confirmar que aparece nos domínios suportados.
- Exportar JSON.
- Importar o JSON em um perfil limpo ou após limpar o storage da extensão.
- Tentar importar JSON inválido e confirmar mensagem de erro sem apagar dados atuais.
- Abrir a tela de boas-vindas em `welcome.html` e confirmar os 3 passos de onboarding.
- Abrir a página de opções da extensão e validar busca global, filtros `Todos`, `Fixados`, `Globais` e filtro por domínio.
- Na página de opções, validar copiar, editar, fixar/desafixar, excluir, exportar e importar.
- Abrir `site/index.html` em desktop e mobile e confirmar que não há promessa de sync, IA, nuvem ou colaboração.
- Conferir a ficha em `store/listing/pt-BR.md`.
- Conferir `site/privacy.html` e a aba Privacy da Chrome Web Store contra o manifesto real: `activeTab`, `storage`, `host_permissions` em `<all_urls>` e content script em `<all_urls>`.
- Conferir dimensões dos assets da loja em `store/screenshots/`, `store/promotional/` e `store/icons/`.

## Validação automatizada local

```powershell
npm run publish:ready
npm run store:assets
npm run visual:snapshots
```

O smoke automatizado valida o build React/WXT em `dist/` em um perfil temporário de navegador Chromium/Chrome real quando o binário local permite `--load-extension`.

`npm run store:assets` regenera os PNGs da Chrome Web Store a partir de `design-system/screens/telas-da-extensao.html`.

`npm run visual:snapshots` captura referência visual, popup React, welcome, options e landing em `output/playwright/` para inspeção. Essa pasta é local e ignorada pelo Git.

## Prontidão de publicação

- O pacote de upload da extensão é gerado por `npm run package` em `dist/`.
- A landing page publicável fica em `site/` e é publicada pelo workflow `.github/workflows/pages.yml`.
- O guia operacional de publicação está em `docs/publication.md`.
- A publicação real na Chrome Web Store ainda depende de conta de desenvolvedor Google, revisão final da ficha e upload manual.
- O link público da Chrome Web Store deve substituir o CTA da landing quando a extensão for aprovada.
- O link público do GitHub já está conectado na landing.
- A política de privacidade publicável fica em `site/privacy.html`.

## Limitações conhecidas

- O MVP usa domínio como contexto; caminhos específicos ainda não são separados.
- Backup é JSON local, sem criptografia e sem nuvem.
- Não há sincronização entre navegadores ou máquinas.
- Páginas internas do navegador, arquivos locais e `about:blank` não são suportados.
- A validação real final em Chrome/Edge e Chrome Web Store ainda é manual.
