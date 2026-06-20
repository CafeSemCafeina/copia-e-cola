# Spec 004 - CRUD de itens

Status: Done

## Objetivo

Permitir criar, editar, excluir e copiar itens do contexto atual.

## Escopo

- Criar item com título opcional e conteúdo obrigatório.
- Gerar título automático quando vazio.
- Editar título e conteúdo.
- Excluir item com confirmação simples ou ação reversível futura.
- Copiar conteúdo para a área de transferência.
- Atualizar `lastCopiedAt` ao copiar.

## Fora de escopo

- Histórico de versões.
- Lixeira.
- Compartilhamento.
- Templates com variáveis.

## Critérios de aceite

- Criar item novo aparece imediatamente na lista.
- Editar item reflete a alteração sem recarregar a extensão.
- Excluir item remove apenas o item selecionado.
- Copiar item coloca exatamente o conteúdo salvo na área de transferência.
- A UI mostra feedback curto para salvar, copiar, atualizar e excluir.
