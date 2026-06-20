# Spec 002 - Contexto por domínio

Status: Done

## Objetivo

Detectar o domínio da aba ativa e usá-lo como chave principal de contexto.

## Escopo

- Ler a URL da aba ativa ao abrir o popup.
- Normalizar o domínio.
- Exibir o domínio atual no topo do popup.
- Tratar páginas sem domínio útil, como `chrome://`, `about:blank` e arquivos locais.

## Fora de escopo

- Contexto por caminho específico.
- Regras customizadas por usuário.
- Agrupamento automático por família de sites.

## Critérios de aceite

- Em `https://web.whatsapp.com`, o contexto exibido é `web.whatsapp.com`.
- Em `https://www.google.com/search?q=x`, o contexto exibido é `google.com` ou decisão equivalente documentada.
- Em páginas internas do navegador, o popup mostra estado não suportado sem quebrar.
- A função de normalização tem testes unitários quando houver setup de testes.

## Decisão inicial

O MVP usa domínio como unidade de contexto. URL exata e regras avançadas ficam para expansão.
