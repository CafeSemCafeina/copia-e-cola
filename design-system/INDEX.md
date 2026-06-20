# Indice do design system

Data da decisão: 2026-06-20
Depends on: design-system/README.md; docs/adr/0002-brand-assets-read-only.md
Decisor: David Fiocchi

Esta pasta contem a extracao organizada dos pacotes locais:

- `Copia e Cola Design System.zip`
- `Telas do Copia e Cola.zip`

Os arquivos ZIP permanecem como fonte local ignorada pelo Git. A versao navegavel e versionavel fica aqui.

## Estrutura

| Pasta | Conteudo | Uso esperado |
| --- | --- | --- |
| `assets/` | Logomark e wordmark em SVG. | Identidade visual da extensao e materiais publicos. |
| `tokens/` | Cores, fontes, raios, sombras, espacamento, movimento e tipografia em CSS. | Base visual para implementar a extensao. |
| `guidelines/` | Especificacoes HTML de marca, voz, cores, tipografia, espacamento, raios e sombras. | Consulta de criterio visual e linguagem. |
| `components/core/` | `Button`, `Icon`, `IconButton`, `Badge` e exemplos. | Primitivos reutilizaveis de UI. |
| `components/forms/` | `Input`, `Textarea`, `SearchInput` e exemplos. | Formularios do popup. |
| `components/feedback/` | `EmptyState`, `Toast` e exemplos. | Estados vazios, sucesso e erro. |
| `components/clipboard/` | `ClipboardItem`, `DomainHeader` e exemplos. | Elementos especificos do fluxo copia-e-cola. |
| `ui_kits/extension/` | `PopupApp.jsx` e `index.html`. | Prototipo de referencia do popup da extensao. |
| `screens/` | Tela exportada da extensao e runtime de suporte. | Visualizacao das telas extraidas. |

## Arquivos principais

- `README.md`: documentacao completa do design system original.
- `SKILL.md`: instrucoes do pacote de design system.
- `_ds_manifest.json`: manifesto gerado do sistema.
- `_ds_bundle.js`: bundle do design system exportado.
- `_adherence.oxlintrc.json`: regras de aderencia visual.
- `styles.css`: estilos globais do pacote.

## Telas extraidas

- `screens/telas-da-extensao.html`: exportacao visual das telas da extensao.
- `screens/support.js`: suporte necessario para a tela exportada.

A exportacao atual de `screens/telas-da-extensao.html` veio do pacote local `Extensão copia e cola.zip` e inclui a referencia completa para:

- estados do popup: lista, vazio, novo item, edicao, busca, busca vazia, configuracoes, copiado, exclusao e importacao;
- onboarding pos-instalacao;
- pagina de opcoes;
- assets da Chrome Web Store: icones, screenshots, tile pequeno, marquee e copy da ficha.

## Observacoes de implementacao

- O design system foi extraido como referencia de produto, ainda sem app funcional no repositorio.
- Os componentes estao em JSX e devem ser adaptados quando a stack da extensao for definida.
- O MVP deve continuar respeitando os principios ja documentados: local-first, simples antes de inteligente e contexto por dominio.
- A tela exportada e fonte visual, nao runtime de producao. A extensao final deve portar layout, tokens, textos e comportamentos para HTML/CSS/JS simples compatíveis com Manifest V3.
