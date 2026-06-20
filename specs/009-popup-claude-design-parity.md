# Spec 009 - Popup fiel ao Claude Design

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Refinar o popup funcional da extensão até ele corresponder às telas geradas no Claude Design, mantendo os dados reais e os fluxos locais já implementados.

## Escopo

- Ajustar o popup React/WXT em `entrypoints/popup/`, `src/components/` e `src/styles/popup.css` para o layout de 360 px do design.
- Usar a hierarquia visual do Claude Design:
  - cabeçalho com marca, domínio e contagem;
  - busca sempre visível;
  - botão `Novo item para este site`;
  - composer colapsado por padrão;
  - lista por seções `Itens deste site` e `Itens globais`;
  - rodapé `Salvo localmente neste navegador` com acesso a `Backup`.
- Implementar estados funcionais equivalentes:
  - lista padrão;
  - primeiro uso vazio;
  - novo item;
  - editar item;
  - busca com resultado;
  - busca sem resultados;
  - configurações/backup;
  - copiado com toast;
  - exclusão com confirmação visual própria;
  - importação com resumo de resultado.
- Trocar linguagem visual de `Favoritar` para `Fixar` quando for a intenção do design, mantendo o campo `favorite` no storage por compatibilidade.
- Manter suporte a itens globais.
- Manter import/export JSON sem apagar dados atuais.

## Botões e comportamentos necessários

- `Configurações`: abre a tela interna de configurações no popup.
- `Backup`: abre a mesma tela de configurações/backup.
- `Novo item para este site`: expande o composer vazio.
- `Salvar`: cria item do domínio atual ou global.
- `Salvar alterações`: atualiza item existente.
- `Cancelar`: recolhe o composer e limpa edição.
- `Limpar busca`: remove texto de busca e restaura a lista.
- `Copiar`: copia conteúdo, marca `lastCopiedAt` e exibe toast.
- `Fixar` / `Desafixar`: alterna `favorite`.
- `Editar`: abre composer preenchido.
- `Excluir`: abre confirmação.
- `Cancelar exclusão`: fecha confirmação sem alterar dados.
- `Confirmar exclusão`: remove item.
- `Exportar JSON`: baixa backup local.
- `Importar JSON`: seleciona arquivo, valida e mostra resumo.

## Fora de escopo

- Sync entre dispositivos.
- Conta de usuário.
- IA, sugestões automáticas ou preenchimento inteligente.
- Reescrever o storage schema além do necessário para compatibilidade visual.

## Critérios de aceite

- O popup continua sem build e sem recursos remotos.
- Todos os fluxos da spec `005` e `006` continuam funcionando.
- Os textos visíveis batem com a referência do Claude Design, salvo ajustes necessários para clareza operacional.
- A largura e densidade visual correspondem ao mock de 360 px.
- Textos longos não causam overflow, clipping ou layout quebrado.
- A confirmação de exclusão impede remoção acidental.
- A importação mostra erro claro para JSON inválido e resumo para JSON válido.
- `npm run check` passa.
- O smoke test em Chrome/Chromium cobre salvar, copiar, fixar, editar, excluir, buscar, exportar e importar.

## Referência visual

Usar `screenList`, `screenEmpty`, `screenNew`, `screenEdit`, `screenSearch`, `screenSearchEmpty`, `screenSettings`, `screenCopied`, `screenDelete` e `screenImport` do arquivo versionado em `design-system/screens/telas-da-extensao.html`.
