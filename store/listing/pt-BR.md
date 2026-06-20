# Copia e Cola - ficha da Chrome Web Store

## Nome

Copia e Cola — clipboard por site

## Descrição curta

Salve textos que você repete e cole de volta com um clique — organizados pelo site em que você está. Local-first e open-source.

## Categoria

Produtividade

## Idioma

Português (Brasil)

## Descrição completa

Copia e Cola é uma extensão local-first para guardar textos reutilizáveis no navegador.

Ao abrir um site, você vê apenas os itens salvos para aquele domínio, além dos itens globais que podem ser usados em qualquer lugar. Assim, respostas do WhatsApp Web, modelos de portal jurídico, textos de CRM e orientações internas não ficam misturados em uma biblioteca genérica.

O que você pode fazer:

- salvar textos por site;
- criar itens globais;
- buscar por título ou conteúdo;
- copiar com um clique;
- fixar, editar e excluir itens;
- exportar e importar backup em JSON.

Seus dados ficam no storage local do navegador. A extensão não exige conta, não usa nuvem e não envia seus textos para servidores.

## Permissões

- `activeTab`: usada para identificar o domínio da aba ativa quando o popup é aberto.
- `storage`: usada para salvar os textos localmente no navegador.

## Privacidade

- Não há login.
- Não há sync em nuvem.
- Não há analytics de terceiros.
- Não há envio de textos para servidor.
- Backup e importação acontecem por arquivo JSON local escolhido pelo usuário.

## Assets

- Ícones: `store/icons/`.
- Screenshots: `store/screenshots/`.
- Tiles promocionais: `store/promotional/`.
- Regeneração: `npm run store:assets`.

## Decisão de ícones

Os ícones da loja foram versionados em `store/icons/`. Os ícones runtime da extensão permanecem em `extension/assets/icons/` para evitar troca visual de manifest sem revisão manual em navegador; eles podem ser substituídos pelos ícones da loja em uma etapa separada se a validação visual aprovar.
