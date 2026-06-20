# Spec 001 - Scaffold da extensão

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Criar a base técnica mínima de uma extensão Chrome/Edge Manifest V3 para o Copia e Cola.

## Escopo

- Estrutura de diretórios da extensão.
- `manifest.json` Manifest V3.
- Popup HTML/CSS/JS carregável.
- Ícones placeholder.
- Script de build ou empacotamento simples, se necessário.
- Instruções para carregar via `chrome://extensions`.

## Fora de escopo

- Backend.
- Login.
- Sync.
- Chrome Web Store.
- Framework de UI pesado sem necessidade.

## Critérios de aceite

- A extensão carrega em modo desenvolvedor no Chrome/Edge.
- O popup abre sem erro.
- O manifesto solicita apenas permissões necessárias para o MVP.
- O README explica como instalar localmente.

## Notas técnicas

Permissões iniciais esperadas:

- `activeTab`;
- `storage`.

Permissões adicionais devem ser justificadas antes de entrar no manifesto.
