# Copia e Cola

Copia e Cola é um micro SaaS open-source e local-first para guardar textos, prompts, protocolos e modelos de resposta por contexto de uso no navegador.

A ideia inicial é simples: ao abrir um site, o usuário vê apenas os itens salvos para aquele domínio. Assim, conteúdos usados no WhatsApp Web, em tribunais, CRMs, portais públicos ou ferramentas internas não ficam misturados em uma biblioteca genérica.

## Objetivo do MVP

Validar se um clipboard contextual por site reduz retrabalho em operações brasileiras que vivem copiando e colando pequenos textos entre páginas.

O primeiro recorte deve ser uma extensão de navegador com:

- salvamento local de itens por domínio;
- título opcional;
- lista de itens do site atual;
- copiar com um clique;
- editar e excluir itens;
- exportação e importação local em JSON.

## Princípios

- Local-first: o conteúdo do usuário fica no navegador por padrão.
- Open-source: o núcleo deve ser auditável e gratuito.
- Simples antes de inteligente: o MVP deve resolver cópia e cola antes de IA, sync ou colaboração.
- Brasil primeiro: jurídico, WhatsApp, portais públicos, CRMs e sistemas legados são contextos de produto relevantes.

## Status

MVP local da extensão Manifest V3 implementado em `extension/`.

## Instalação local da extensão

1. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge.
2. Ative o modo desenvolvedor.
3. Clique em "Carregar sem compactação".
4. Selecione a pasta `extension/` deste repositório.
5. Fixe a extensão na barra do navegador e abra o popup em qualquer site.

O manifesto inicial solicita apenas `activeTab` e `storage`, que são usados para identificar o domínio da aba atual e validar o armazenamento local do MVP.

## Uso

- O topo mostra o domínio normalizado da aba ativa.
- O formulário salva itens do site atual ou itens globais.
- A lista permite buscar, copiar, editar, favoritar e excluir.
- O painel de backup exporta e importa JSON local sem apagar dados atuais.

Páginas internas do navegador, arquivos locais e `about:blank` mostram estado não suportado.

## Desenvolvimento

Requisitos: Node.js 20 ou superior.

```powershell
npm install
npm run check
```

`npm run check` executa testes unitários e validações simples do pacote da extensão, incluindo Manifest V3, permissões mínimas, referências de arquivos e ausência de recursos remotos no popup.

Para validar em navegador Chromium/Chrome real com extensão descompactada, rode:

```powershell
npm run chrome:smoke
```

Esse smoke test carrega a extensão em um perfil temporário, abre o popup pelo `chrome-extension://...` e valida fluxo básico: domínio `web.whatsapp.com`, salvar, persistir após reload, isolamento entre domínios e item global.

O Chrome estável instalado pode bloquear flags de carregamento de extensão em automação. Quando isso acontece, o script usa um Chromium local compatível do Playwright, se disponível.

## Validação manual

O roteiro para teste em Chrome/Edge está em [docs/validation-checklist.md](docs/validation-checklist.md).

## Design system

As telas e elementos visuais extraidos dos pacotes locais ficam em [design-system/INDEX.md](design-system/INDEX.md).

Ali estao organizados tokens, guidelines, componentes JSX, assets de marca, UI kit do popup e a tela exportada da extensao.

## Roadmap curto

1. Definir PRD mínimo e critérios de aceite.
2. Implementar extensão Manifest V3.
3. Validar uso local em 3 contextos: WhatsApp Web, um portal jurídico e uma ferramenta Syntelix.
4. Decidir o corte entre gratuito, Plus e licença vitalícia local.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).
