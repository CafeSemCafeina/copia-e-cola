# Documentacao

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; docs/adr/0002-brand-assets-read-only.md; docs/adr/0003-product-packaging-and-pricing.md; docs/adr/0004-stripe-offer-and-checkout-flow.md; docs/adr/0005-agent-worktree-isolation.md
Decisor: David Fiocchi

Esta pasta separa produto, decisoes, validacao e historico.

## Metadados obrigatorios

Todo documento de documentacao ou decisao deve declarar, logo abaixo do titulo quando houver titulo:

```md
Data da decisão: AAAA-MM-DD
Depends on: caminho/ou/N/A
Decisor: Nome do decisor
```

Quando uma decisao nova conflitar com uma decisao antiga, a decisao mais nova substitui automaticamente a antiga. A data usada para resolver esse conflito e `Data da decisão`.

## Produto

- `PRD.md`: tese do produto, escopo do MVP local, usuarios, riscos e criterios de sucesso.
- `specs/` na raiz do repositorio: specs pequenas e executaveis por incremento.

## Decisoes

Decisoes estruturais devem ficar em `docs/adr/`, no formato ADR.

ADRs atuais:

- `adr/0001-open-core-and-cloud-boundary.md`: separa core publico MIT de cloud privado.
- `adr/0002-brand-assets-read-only.md`: define marca/assets como portfolio read-only, nao como parte livre da MIT.
- `adr/0003-product-packaging-and-pricing.md`: define planos Open Source Local, Free Cloud, Pro, AI e diretrizes de pricing.
- `adr/0004-stripe-offer-and-checkout-flow.md`: define pagina de ofertas e fluxo Stripe.
- `adr/0005-agent-worktree-isolation.md`: define um worktree Git por spec/tarefa/agent para evitar interferencia entre contextos paralelos.

## Operacao

- `publication.md`: como publicar landing page e extensao.
- `validation-checklist.md`: checklist manual e automatizado de QA.
- `repository-boundaries.md`: mapa operacional do que fica publico MIT, publico read-only e privado.

## Historico

- `archive/legacy-zip-asset-map.md`: resumo do ZIP de design importado no inicio do projeto. Mantido apenas como memoria de origem, nao como plano de implementacao atual.
