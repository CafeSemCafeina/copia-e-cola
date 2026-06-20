# Copia e Cola

Copia e Cola é um micro SaaS open-source e local-first para guardar textos, prompts, protocolos e modelos de resposta por contexto de uso no navegador.

A ideia inicial é simples: ao abrir um site, o usuário vê apenas os itens salvos para aquele domínio. Assim, conteúdos usados no WhatsApp Web, em tribunais, CRMs, portais públicos ou ferramentas internas não ficam misturados em uma biblioteca genérica.

## Objetivo do MVP

Validar se um clipboard contextual por site reduz retrabalho em operações brasileiras que vivem copiando e colando pequenos textos entre páginas.

O primeiro recorte é uma extensão de navegador com:

- salvamento local de itens por domínio;
- título opcional;
- lista de itens do site atual;
- copiar com um clique;
- editar e excluir itens;
- exportação e importação local em JSON.
- página de boas-vindas pós-instalação;
- página de opções para gerenciar todos os itens;
- assets e copy inicial para Chrome Web Store;
- landing page estática em `site/`.

## Princípios

- Local-first: o conteúdo do usuário fica no navegador por padrão.
- Open-source: o núcleo deve ser auditável e gratuito.
- Simples antes de inteligente: o MVP deve resolver cópia e cola antes de IA, sync ou colaboração.
- Brasil primeiro: jurídico, WhatsApp, portais públicos, CRMs e sistemas legados são contextos de produto relevantes.

## Status

MVP local da extensão Manifest V3 migrado para React/WXT. A fonte publicável fica em `entrypoints/`, `src/` e `public/`; o build carregável pelo navegador é gerado em `dist/`.

A versão vanilla antiga foi removida para evitar código morto. O histórico de produto, design e decisões fica preservado em `docs/`, `specs/`, `design-system/`, `store/` e `site/`.

## Organização do repositório

- `entrypoints/`: telas WXT/React publicáveis da extensão.
- `src/`: core local open-source, componentes e estilos compartilhados.
- `public/`: assets necessários para o build da extensão.
- `tests/`: testes TypeScript do core local.
- `scripts/`: validações e geração de assets publicáveis.
- `docs/`: PRD, ADRs, política de empacotamento e documentação de publicação.
- `specs/`: specs versionadas do MVP e evolução do produto.
- `design-system/`: referência visual e decisões de UX para portfólio.
- `store/`: materiais de Chrome Web Store para portfólio/publicação.
- `site/`: landing page e política de privacidade pública.

O backend cloud oficial, billing, sync, IA, prompts privados e infraestrutura devem viver fora deste repositório, no projeto privado `copia-e-cola-cloud`.

## Instalação local da extensão

1. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge.
2. Ative o modo desenvolvedor.
3. Clique em "Carregar sem compactação".
4. Rode `npm run build`.
5. Selecione a pasta `dist/` deste repositório.
6. Fixe a extensão na barra do navegador e abra o popup em qualquer site.

O manifesto inicial solicita apenas `activeTab` e `storage`, que são usados para identificar o domínio da aba atual e validar o armazenamento local do MVP.

## Uso

- O topo mostra o domínio normalizado da aba ativa.
- O formulário salva itens do site atual ou itens globais.
- A lista permite buscar, copiar, editar, fixar e excluir.
- O painel de backup exporta e importa JSON local sem apagar dados atuais.
- A página de opções permite busca global, filtros por fixados, globais e domínio, além de edição e backup.
- A página de boas-vindas abre na instalação para explicar o fluxo em 3 passos.

Páginas internas do navegador, arquivos locais e `about:blank` mostram estado não suportado.

## Desenvolvimento

Requisitos: Node.js 20 ou superior.

```powershell
npm install
npm run store:assets
npm run publish:ready
```

`npm run build` usa WXT para gerar a extensão Manifest V3 em `dist/`, com React empacotado localmente e sem JavaScript remoto.

`npm run store:assets` regenera screenshots e tiles da Chrome Web Store a partir da referência visual versionada.

`npm run check` executa testes unitários e validações do pacote da extensão e dos materiais de publicação, incluindo Manifest V3, permissões mínimas, referências de arquivos, ausência de recursos remotos indevidos, landing page e dimensões dos PNGs da loja.

`npm run publish:ready` adiciona o smoke test em navegador Chromium/Chrome real e gera o zip publicável via WXT em `dist/`.

Para validar em navegador Chromium/Chrome real com extensão descompactada, rode:

```powershell
npm run chrome:smoke
```

Esse smoke test carrega `dist/` em um perfil temporário, abre o popup pelo `chrome-extension://...` e valida domínio `web.whatsapp.com`, salvar, copiar, fixar, editar, excluir, buscar, persistir após reload, isolamento entre domínios, item global, backup/importação, welcome e options.

O Chrome estável instalado pode bloquear flags de carregamento de extensão em automação. Quando isso acontece, o script usa um Chromium local compatível do Playwright, se disponível.

## Validação manual

O roteiro para teste em Chrome/Edge está em [docs/validation-checklist.md](docs/validation-checklist.md).

O roteiro de publicação está em [docs/publication.md](docs/publication.md).

Para gerar capturas visuais locais de comparação, rode:

```powershell
npm run visual:snapshots
```

As imagens são gravadas em `output/playwright/`, pasta local ignorada pelo Git.

## Design system

As telas e elementos visuais extraidos dos pacotes locais ficam em [design-system/INDEX.md](design-system/INDEX.md).

Ali estao organizados tokens, guidelines, componentes JSX, assets de marca, UI kit do popup e a tela exportada da extensao, incluindo popup, onboarding, options e materiais da Chrome Web Store.

## Roadmap curto

1. Definir PRD mínimo e critérios de aceite.
2. Implementar extensão Manifest V3.
3. Validar uso local em 3 contextos: WhatsApp Web, um portal jurídico e uma ferramenta Syntelix.
4. Decidir o corte entre gratuito, Plus e licença vitalícia local.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).

O código é livre, mas a marca Copia e Cola não faz parte da licença de software. Veja [TRADEMARKS.md](TRADEMARKS.md).

Assets de marca, screenshots, materiais de loja, design system, PRD, ADRs e specs ficam publicados como material de portfólio e documentação, mas não concedem direito de uso da marca nem dos assets oficiais em forks ou redistribuições.
