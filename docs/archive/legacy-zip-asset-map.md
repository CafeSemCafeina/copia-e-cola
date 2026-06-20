# Legado - mapeamento do ZIP de design

Status: arquivo historico.

Este documento substitui o antigo `docs/zip-asset-map.md`, que continha instrucoes de implementacao da fase vanilla em `extension/`. Essa pasta foi removida depois da migracao para React/WXT.

## Origem

Fonte analisada:

`C:\Users\Zgame\Dev\Syntelix\MVPs\copia-e-cola\Extensão copia e cola.zip`

O ZIP permanece ignorado pelo Git por `*.zip` em `.gitignore`. Ele deve ser tratado como pacote local de origem visual, nao como artefato versionavel.

## O que foi aproveitado

- fonte visual em `design-system/screens/telas-da-extensao.html`;
- design system em `design-system/`;
- assets de loja em `store/`;
- landing page em `site/`;
- assets runtime em `public/assets/`;
- materiais de publicacao em `docs/publication.md` e `store/listing/pt-BR.md`.

## Estado atual

A fonte publicavel da extensao nao usa mais `extension/`.

Estrutura atual:

- `entrypoints/`: telas WXT/React;
- `src/`: core, componentes e estilos;
- `public/`: assets que entram no build;
- `dist/`: build gerado e ignorado pelo Git;
- `store/`: materiais de Chrome Web Store;
- `design-system/`: referencia visual de portfolio.

## Regra futura

Se um novo ZIP de design for usado:

1. nao versionar o ZIP;
2. extrair apenas arquivos necessarios para `design-system/`, `store/`, `site/` ou `public/`;
3. atualizar validacoes;
4. registrar decisoes estruturais como ADR;
5. nao recriar a pasta legada `extension/`.
