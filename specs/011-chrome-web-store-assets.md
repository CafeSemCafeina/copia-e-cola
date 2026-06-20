# Spec 011 - Assets e ficha da Chrome Web Store

Status: Done

## Objetivo

Organizar e gerar os materiais necessários para publicar a extensão na Chrome Web Store usando os assets definidos no Claude Design.

## Escopo

- Criar estrutura versionada:
  - `store/listing/pt-BR.md`;
  - `store/screenshots/`;
  - `store/promotional/`;
  - `store/icons/`.
- Copiar ou gerar ícones:
  - `store/icons/icon-16.png`;
  - `store/icons/icon-32.png`;
  - `store/icons/icon-48.png`;
  - `store/icons/icon-128.png`.
- Decidir se os ícones da loja devem substituir os de `extension/assets/icons/`.
- Gerar screenshots PNG 1280x800 a partir do design:
  - `store/screenshots/contexto-por-site-1280x800.png`;
  - `store/screenshots/salvar-e-reutilizar-1280x800.png`;
  - `store/screenshots/local-first-1280x800.png`.
- Gerar tiles promocionais:
  - `store/promotional/small-tile-440x280.png`;
  - `store/promotional/marquee-1440x560.png`.
- Criar copy da ficha em `store/listing/pt-BR.md` com:
  - nome;
  - descrição curta;
  - categoria;
  - idioma;
  - descrição completa;
  - checklist de privacidade;
  - permissões usadas e justificativa.

## Conteúdo base da ficha

- Nome: `Copia e Cola — clipboard por site`.
- Descrição curta: `Salve textos que você repete e cole de volta com um clique — organizados pelo site em que você está. Local-first e open-source.`
- Categoria: `Produtividade`.
- Idioma: `Português (Brasil)`.

## Fora de escopo

- Upload real para a Chrome Web Store.
- Conta de desenvolvedor Google.
- Pagamentos ou cobrança.
- Internacionalização para outros idiomas.

## Critérios de aceite

- Todos os PNGs têm as dimensões esperadas.
- Os assets não dependem do ZIP local para serem usados.
- `store/listing/pt-BR.md` contém texto pronto para colar na ficha.
- A justificativa de permissões está alinhada ao manifest real.
- As imagens não contêm conteúdo enganoso ou funcionalidade inexistente.
- Existe comando ou script documentado para regenerar screenshots e tiles a partir da referência visual.

## Observação técnica

O ZIP não traz PNGs finais para screenshots e tiles. Eles devem ser renderizados a partir de `Telas da Extensão.dc.html` ou do HTML standalone usando Playwright.
