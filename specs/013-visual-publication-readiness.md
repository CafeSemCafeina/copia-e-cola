# Spec 013 - Validação visual e prontidão de publicação

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Garantir que a extensão, os assets de loja e a landing page estejam visualmente alinhados ao Claude Design e tecnicamente prontos para publicação.

## Escopo

- Criar ou atualizar scripts de validação para:
  - manifest MV3;
  - referências locais;
  - ausência de recursos remotos indevidos;
  - presença de `options_page`;
  - presença de `background.service_worker`;
  - presença de `welcome`, `options`, popup, store assets e landing.
- Criar validação visual com Playwright:
  - renderizar referência do design;
  - renderizar popup real;
  - renderizar welcome real;
  - renderizar options real;
  - renderizar landing;
  - capturar screenshots em tamanhos definidos.
- Criar checklist manual de publicação:
  - instalar extensão descompactada;
  - validar fluxos principais;
  - validar materiais da Chrome Web Store;
  - revisar política de privacidade;
  - revisar permissões.
- Atualizar `docs/validation-checklist.md`.
- Atualizar README com status publicável quando aplicável.

## Fora de escopo

- Publicação real na Chrome Web Store.
- Criação de conta de desenvolvedor.
- Revisão jurídica formal.
- Monitoramento pós-publicação.

## Critérios de aceite

- `npm run check` valida testes unitários e pacote de extensão.
- `npm run chrome:smoke` cobre popup, welcome e options.
- Existe comando documentado para gerar screenshots de comparação.
- Diferenças visuais relevantes entre produto real e Claude Design são registradas ou corrigidas.
- Store assets existem, têm dimensões corretas e são referenciáveis.
- Landing page passa por checagem responsiva desktop/mobile.
- O checklist manual deixa claro o que ainda depende de ação externa, como conta da Chrome Web Store.

## Definição de "idêntico"

Para esta spec, "idêntico ao Claude Design" significa:

- mesma estrutura de telas e estados;
- mesma hierarquia visual;
- cores, raios, densidade e espaçamentos equivalentes aos tokens;
- textos e CTAs equivalentes;
- comportamento funcional coerente com os botões desenhados;
- nenhuma divergência perceptível que mude a leitura do produto.

Pequenas diferenças técnicas são aceitáveis quando necessárias para Manifest V3, acessibilidade ou ausência do runtime do Claude Design, desde que documentadas.
