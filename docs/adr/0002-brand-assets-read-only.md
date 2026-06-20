# ADR 0002 - Marca e assets como portfolio read-only

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; TRADEMARKS.md
Decisor: David Fiocchi

Status: accepted

## Contexto

O projeto usa MIT para liberar o codigo, mas tambem contem logos, icones, screenshots, design system, copy de loja, PRD, specs e decisoes de produto. Esses materiais sao uteis para portfolio, mas podem gerar confusao se forks os reutilizarem como se fossem oficiais.

## Decisao

Tratar assets de marca e artefatos de produto como publicos para leitura, mas nao como assets livres para redistribuicao.

O repositorio deve manter:

- `TRADEMARKS.md` na raiz;
- avisos locais de licenca em pastas de assets;
- validacao automatica de fronteiras em `scripts/validate-repo-boundaries.mjs`;
- README explicando que codigo e marca seguem regras diferentes.

## Consequencias

- O codigo continua simples e permissivo via MIT.
- A marca Copia e Cola fica protegida de uso confuso.
- O portfolio permanece navegavel.
- Quem fizer fork precisa trocar identidade visual, loja, screenshots e copy oficial.
