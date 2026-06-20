# Spec 010 - Welcome e página de opções

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Adicionar as páginas internas exigidas pelas telas do Claude Design: onboarding pós-instalação e gerenciamento completo dos itens.

## Escopo

### Welcome pós-instalação

- Criar `entrypoints/welcome/` como página React/WXT.
- Criar estilos em `src/styles/welcome.css`.
- Criar `entrypoints/background.ts` com `chrome.runtime.onInstalled`.
- Abrir `welcome.html` após instalação no build gerado.
- Declarar `background.service_worker` pelo WXT no Manifest V3 gerado.
- Usar conteúdo do design:
  - `Tudo pronto para copiar menos e colar melhor`;
  - `Contexto por site`;
  - `Salve em segundos`;
  - `Copie com 1 clique`;
  - card local-first;
  - dica para fixar o ícone na barra do navegador.

### Página de opções

- Criar `entrypoints/options/` como página React/WXT.
- Criar estilos em `src/styles/options.css`.
- Declarar `options_page` pelo WXT no Manifest V3 gerado.
- Reusar `src/lib/storage.ts` e `src/lib/backup.ts`.
- Implementar busca global em todos os itens.
- Agrupar itens por domínio e por globais.
- Implementar filtros:
  - `Todos`;
  - `Fixados`;
  - `Globais`;
  - domínios disponíveis.
- Implementar ações por item:
  - copiar;
  - editar;
  - fixar/desafixar;
  - excluir com confirmação.
- Implementar resumo lateral:
  - total de itens;
  - sites;
  - globais;
  - fixados.
- Implementar export/import JSON na página de opções.

## Botões e comportamentos necessários

- `Começar a salvar`: fecha ou direciona o usuário para usar a extensão.
- `Ver no GitHub`: abre o repositório se a URL pública estiver definida; caso contrário, esconder até existir URL final.
- `Buscar em todos os itens`: filtra localmente por título, conteúdo e domínio.
- `Todos`: mostra todos os grupos.
- `Fixados`: mostra apenas itens com `favorite === true`.
- `Globais`: mostra apenas itens globais.
- Filtro por domínio: mostra apenas itens daquele domínio.
- `Exportar`: exporta todos os itens.
- `Importar`: importa backup válido sem apagar dados atuais.

## Fora de escopo

- Dashboard analítico.
- Edição em massa.
- Login.
- Permissões além das necessárias para abrir páginas e acessar storage local.

## Critérios de aceite

- A welcome page abre automaticamente em instalação nova.
- A welcome page também pode ser aberta diretamente por URL local da extensão.
- A página de opções aparece em `chrome://extensions` como opções da extensão.
- Todos os dados exibidos em options vêm do storage real.
- Busca e filtros combinam corretamente.
- Export/import funcionam tanto no popup quanto em options.
- O manifest continua Manifest V3 válido.
- `npm run check` passa e valida referências locais das novas páginas.

## Referência visual

Usar `screenOnboarding` e `screenOptions` do arquivo versionado em `design-system/screens/telas-da-extensao.html`.
