# Spec 008 - Fonte visual Claude Design

Status: Done

## Objetivo

Versionar a fonte visual completa gerada no Claude Design para que o produto real possa ser comparado contra uma referência única.

## Escopo

- Atualizar `design-system/screens/telas-da-extensao.html` com a versão nova de `Telas da Extensão.dc.html` contida em `Extensão copia e cola.zip`.
- Conferir se `design-system/screens/support.js` precisa ser atualizado a partir do ZIP.
- Manter `_ds`, tokens, bundle e manifesto existentes se os hashes continuarem iguais.
- Registrar no `design-system/INDEX.md` que a tela exportada inclui:
  - estados do popup;
  - onboarding pós-instalação;
  - página de opções;
  - assets de Chrome Web Store;
  - copy da ficha.
- Preservar o inventário histórico do pacote local em `docs/archive/legacy-zip-asset-map.md`.

## Fora de escopo

- Copiar o HTML do design diretamente para a extensão.
- Introduzir React ou runtime do Claude Design no produto final.
- Versionar o ZIP ignorado por `*.zip`.

## Critérios de aceite

- `design-system/screens/telas-da-extensao.html` contém todos os placeholders e telas do ZIP:
  - `screenList`;
  - `screenEmpty`;
  - `screenNew`;
  - `screenEdit`;
  - `screenSearch`;
  - `screenSearchEmpty`;
  - `screenSettings`;
  - `screenCopied`;
  - `screenDelete`;
  - `screenImport`;
  - `screenOnboarding`;
  - `screenOptions`;
  - `iconsRow`;
  - `storeShot1`;
  - `storeShot2`;
  - `storeShot3`;
  - `promoSmall`;
  - `marquee`;
  - `storeCopy`.
- A tela exportada abre localmente sem recursos remotos.
- A documentação deixa claro que o design exportado é referência, não implementação de runtime.

## Observação técnica

A implementação final deve portar layout, tokens, textos e comportamentos para HTML/CSS/JS MV3 simples. A referência visual deve ser usada para inspeção e comparação, não como dependência de produção.
