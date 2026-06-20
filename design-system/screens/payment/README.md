# Telas de pagamento

Data da decisão: 2026-06-20
Depends on: docs/adr/0003-product-packaging-and-pricing.md; docs/repository-boundaries.md
Decisor: David Fiocchi

Referencias visuais para oferta, checkout e sucesso do Copia e Cola Pro.

## Origem

Fonte local importada:

`design-system/screens/payment_screens.zip`

O ZIP foi descompactado em uma pasta temporaria, comparado com o design system versionado e depois removido. O pacote trazia:

- `Checkout Copia e Cola Pro.dc.html`;
- `support.js`;
- assets de marca;
- `_ds/` com tokens, bundle e manifesto.

`support.js`, assets e `_ds/` eram identicos aos arquivos ja versionados em `design-system/`, entao nao foram duplicados.

## Arquivos versionados

- `checkout-copia-e-cola-pro.html`: tela interativa de referencia com tres estados:
  - selecao de plano;
  - checkout/pagamento;
  - pagamento confirmado.

## Uso

Esta tela e referencia visual e de produto. Ela nao e implementacao final do billing.

O fluxo real de pagamento deve ficar no repo privado `copia-e-cola-cloud`, usando Stripe Checkout/Customer Portal e webhooks. O repo publico pode manter a especificacao, contratos e telas de portfolio, mas nao deve conter chaves, endpoints administrativos ou regras privadas de billing.
