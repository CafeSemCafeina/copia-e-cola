# Spec 006 - Exportação e importação

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Garantir portabilidade dos dados do usuário desde o MVP.

## Escopo

- Exportar todos os itens para JSON.
- Importar JSON exportado pelo próprio produto.
- Validar formato antes de importar.
- Evitar duplicação óbvia por `id`.
- Mostrar resumo após importação.

## Fora de escopo

- CSV.
- Integração com Google Drive, Dropbox ou OneDrive.
- Sync automático.
- Criptografia de backup.

## Critérios de aceite

- Usuário consegue baixar um arquivo JSON com seus itens.
- Usuário consegue restaurar itens a partir de JSON válido.
- JSON inválido mostra erro claro e não altera dados existentes.
- Importação não apaga dados atuais sem confirmação explícita.

## Observação de produto

Export/import é parte da promessa local-first: o usuário deve conseguir sair do produto levando seus dados.
