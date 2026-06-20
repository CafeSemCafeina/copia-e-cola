# Spec 010 - Welcome e página de opções

Status: Done

## Objetivo

Adicionar as páginas internas exigidas pelas telas do Claude Design: onboarding pós-instalação e gerenciamento completo dos itens.

## Escopo

### Welcome pós-instalação

- Criar `extension/welcome/welcome.html`.
- Criar `extension/welcome/welcome.css`.
- Criar `extension/welcome/welcome.js` somente se houver interação real.
- Criar `extension/background.js` com `chrome.runtime.onInstalled`.
- Abrir `welcome/welcome.html` após instalação.
- Declarar `background.service_worker` no `manifest.json`.
- Usar conteúdo do design:
  - `Tudo pronto para copiar menos e colar melhor`;
  - `Contexto por site`;
  - `Salve em segundos`;
  - `Copie com 1 clique`;
  - card local-first;
  - dica para fixar o ícone na barra do navegador.

### Página de opções

- Criar `extension/options/options.html`.
- Criar `extension/options/options.css`.
- Criar `extension/options/options.js`.
- Declarar `options_page` no `manifest.json`.
- Reusar `extension/lib/storage.js` e `extension/lib/backup.js`.
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
