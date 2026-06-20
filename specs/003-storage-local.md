# Spec 003 - Storage local

Data da decisão: 2026-06-20
Depends on: specs/README.md; docs/PRD.md
Decisor: David Fiocchi

Status: Done

## Objetivo

Persistir itens localmente no navegador usando `chrome.storage.local`.

## Escopo

- Definir modelo de item.
- Criar camada de acesso ao storage.
- Listar itens por domínio.
- Listar itens globais.
- Preservar datas de criação e atualização.
- Gerar IDs estáveis.

## Modelo inicial

```ts
type ClipboardItem = {
  id: string;
  scope: "domain" | "global";
  domain: string | null;
  title: string;
  content: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  lastCopiedAt: string | null;
};
```

## Fora de escopo

- Criptografia local.
- Backup em nuvem.
- Migração complexa de schema.

## Critérios de aceite

- Itens persistem após fechar e reabrir o popup.
- Itens de um domínio não aparecem em outro domínio.
- Itens globais aparecem em qualquer domínio suportado.
- Conteúdo vazio não é salvo.
- Erros de storage são tratados com mensagem visível.
