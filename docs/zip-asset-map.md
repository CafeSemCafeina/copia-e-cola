# Mapeamento do ZIP `Extensão copia e cola.zip`

Fonte analisada em `C:\Users\Zgame\Dev\Syntelix\MVPs\copia-e-cola\Extensão copia e cola.zip`.

O ZIP esta ignorado pelo Git por causa da regra `*.zip` em `.gitignore`. Ele deve ser tratado como pacote-fonte local de design/export, nao como artefato final versionavel. O conteudo que interessar deve ser extraido para pastas versionadas do repositorio.

## Inventario do ZIP

| Caminho no ZIP | Uso | Status no repo |
| --- | --- | --- |
| `Telas da Extensão.dc.html` | Fonte editavel/estruturada das telas da extensao e dos assets da Chrome Web Store. | Existe uma versao menor em `design-system/screens/telas-da-extensao.html`; precisa ser atualizada. |
| `Copia e Cola - telas (standalone).html` | Render standalone completo, com suporte embutido para visualizar/exportar as telas. | Nao existe equivalente versionado. Pode entrar em `design-system/screens/` como referencia de export, se fizer sentido. |
| `support.js` | Runtime usado pelos arquivos `.dc.html`. | Ja existe em `design-system/screens/support.js`; confirmar se precisa atualizar junto do novo `.dc.html`. |
| `_ds/...` | Design system exportado: tokens, bundle, manifesto, readme, regras de aderencia. | Igual ao que ja esta em `design-system/`; nao precisa duplicar. |
| `store/icons/icon-16.png` | Icone 16x16 para manifest/loja. | Ja existe em `extension/assets/icons/icon-16.png`; comparar visualmente antes de substituir. |
| `store/icons/icon-32.png` | Icone 32x32 para manifest/loja. | Ja existe em `extension/assets/icons/icon-32.png`; comparar visualmente antes de substituir. |
| `store/icons/icon-48.png` | Icone 48x48 para manifest/loja. | Ja existe em `extension/assets/icons/icon-48.png`; comparar visualmente antes de substituir. |
| `store/icons/icon-128.png` | Icone 128x128 para manifest/loja. | Ja existe em `extension/assets/icons/icon-128.png`; comparar visualmente antes de substituir. |
| `.thumbnail` | Thumbnail 320x178 do pacote de design. | Nao precisa entrar na extensao; pode ficar fora do Git. |

## Telas e assets identificados

### Popup da extensao

Estados presentes no novo `Telas da Extensão.dc.html`:

- Lista padrao.
- Primeiro uso vazio.
- Novo item.
- Editar item.
- Busca com resultado global.
- Busca sem resultados.
- Configuracoes / backup.
- Copiado com toast.
- Excluir item com confirmacao.
- Importar JSON com resumo de conflitos.

Status atual:

- A extensao funcional ja tem lista, vazio, formulario, busca, copiar, editar, excluir, favorito, item global, backup export/import.
- O design novo muda a hierarquia visual: busca sempre acima, composer colapsado, rodape local-first e configuracoes como tela propria.
- Faltam os estados desenhados de confirmacao de exclusao e preview/resumo de importacao.

### Aba de boas-vindas

Tela prevista:

- `welcome.html` pos-instalacao.
- Mensagem "Tudo pronto para copiar menos e colar melhor".
- Passos: contexto por site, salvar em segundos, copiar com 1 clique.
- Card local-first e CTAs.

Status atual:

- Nao ha `welcome.html`.
- Nao ha service worker/background para abrir a aba no `chrome.runtime.onInstalled`.

### Pagina de opcoes

Tela prevista:

- `options.html` para gerenciar todos os itens.
- Busca global.
- Agrupamento por dominio e itens globais.
- Filtros: todos, fixados/favoritos, globais e dominios especificos.
- Acoes de exportar/importar.
- Card lateral com resumo local-first.

Status atual:

- Nao ha `options_page` no manifest.
- O storage atual (`extension/lib/storage.js`) ja permite implementar esta pagina sem criar API nova.

### Chrome Web Store

Assets previstos no `.dc.html`:

- Icones 16/32/48/128.
- Tres screenshots 1280x800:
  - Contexto por site.
  - Salvar e reutilizar.
  - Local-first.
- Tile promocional pequeno 440x280.
- Marquee 1440x560.
- Copy da ficha em PT-BR:
  - Nome: `Copia e Cola — clipboard por site`.
  - Descricao curta: `Salve textos que você repete e cole de volta com um clique — organizados pelo site em que você está. Local-first e open-source.`
  - Categoria/idioma: `Produtividade · Português (Brasil)`.
  - Descricao completa com funcionamento, privacidade e proposta open-source.

Status atual:

- O ZIP nao traz PNGs prontos dos screenshots/tiles; esses elementos estao desenhados dentro do HTML de design.
- Precisamos renderizar/exportar esses frames para PNG antes de publicar na Chrome Web Store.
- O repo ainda nao tem pasta dedicada para materiais de loja.

## Implementacao recomendada

### 1. Atualizar a fonte de design versionada

- Substituir `design-system/screens/telas-da-extensao.html` pela versao nova do ZIP.
- Validar se `design-system/screens/support.js` precisa ser atualizado.
- Nao duplicar `_ds`, porque os hashes do ZIP batem com os arquivos atuais do repo.

### 2. Fechar o popup funcional com o novo layout

- Manter HTML/CSS/JS vanilla, sem build.
- Adaptar o popup funcional para o design:
  - composer colapsado por padrao;
  - tela de configuracoes/backup;
  - rodape local-first;
  - toast de copia;
  - confirmacao visual propria para exclusao;
  - resumo de importacao antes/depois de importar.
- Preservar os ids usados pelos testes ou atualizar os testes junto.

### 3. Criar `welcome.html`

- Adicionar `extension/welcome/welcome.html`, `welcome.css` e `welcome.js` se precisar de interacao.
- Adicionar `extension/background.js` com `chrome.runtime.onInstalled` abrindo `welcome/welcome.html`.
- Declarar `background.service_worker` no manifest.
- Manter a pagina sem recursos remotos.

### 4. Criar `options.html`

- Adicionar `extension/options/options.html`, `options.css` e `options.js`.
- Declarar `options_page` no manifest.
- Reusar `storage.js` e `backup.js`.
- Implementar busca, filtros, agrupamento por dominio, copiar, editar, excluir, favorito/fixado, exportar e importar.

### 5. Organizar assets de loja

- Criar `store/` versionado, por exemplo:
  - `store/listing/pt-BR.md`
  - `store/screenshots/`
  - `store/promotional/`
  - `store/icons/`
- Renderizar do HTML de design:
  - `store/screenshots/contexto-por-site-1280x800.png`
  - `store/screenshots/salvar-e-reutilizar-1280x800.png`
  - `store/screenshots/local-first-1280x800.png`
  - `store/promotional/small-tile-440x280.png`
  - `store/promotional/marquee-1440x560.png`
- Decidir se os icones atuais em `extension/assets/icons/` devem ser substituidos pelos de `store/icons/`.

### 6. Atualizar validacoes

- `scripts/validate-extension.mjs` deve verificar:
  - `options_page`;
  - `background.service_worker`;
  - referencias locais de `welcome`, `options` e popup;
  - ausencia de recursos remotos.
- `scripts/chrome-smoke.mjs` deve abrir:
  - popup;
  - options page;
  - welcome page;
  - export/import por popup ou options.

## Riscos e decisoes

- O design usa "fixados", enquanto o dominio atual do codigo usa `favorite`. Implementacao mais segura: manter `favorite` no storage por compatibilidade e trocar somente a linguagem visual para "fixado".
- O `.dc.html` e o standalone sao artefatos de design, nao codigo de produto. Copiar o HTML inteiro para a extensao traria React/runtime de design desnecessario. Melhor portar layout/estilos para as paginas MV3 simples.
- Como `*.zip` esta ignorado, qualquer atualizacao futura do pacote precisa ser reextraida explicitamente para arquivos versionados.
