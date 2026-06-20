# ADR 0003 - Empacotamento e pricing do produto

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; docs/adr/0002-brand-assets-read-only.md
Decisor: David Fiocchi

Status: accepted

## Contexto

O Copia e Cola precisa funcionar como core open-source local-first e, ao mesmo tempo, permitir uma operacao oficial paga com sync, produtividade avancada e IA. A separacao precisa preservar confianca: usar ou sincronizar snippets nao deve implicar envio automatico de texto para IA.

## Decisao

Adotar um modelo open-core com quatro planos individuais iniciais.

### Open Source Local

Core local, MIT, sem conta, sem sync e sem IA.

Inclui:

- extensao local-first;
- snippets por dominio;
- itens globais;
- busca local;
- copiar, editar, fixar e excluir;
- exportacao/importacao JSON;
- personalizacao via codigo.

Papel no negocio:

- base de confianca;
- portfolio tecnico;
- canal para usuarios tecnicos;
- prova publica de que o core nao precisa capturar texto em servidor.

### Free Cloud

Versao oficial gerenciada para usuario comum.

Inclui:

- login com Google;
- sync entre dispositivos;
- backup automatico;
- recursos core;
- limites de snippets e contextos;
- sem IA.

Limite inicial sugerido:

- 30 snippets;
- 5 contextos ou dominios salvos;
- sem compartilhamento de equipe.

### Pro

Plano pago sem IA, focado em produtividade e organizacao.

Inclui:

- limite alto ou snippets ilimitados;
- colecoes/pastas;
- atalhos e expansao por comandos curtos;
- variaveis manuais, como `{nome}`, `{data}`, `{processo}`;
- modelos com campos preenchiveis;
- historico/versionamento;
- regras por dominio ou URL;
- bot de WhatsApp para salvar notas/snippets, se o custo operacional fechar.

Preco inicial sugerido:

- faixa: R$ 19 a R$ 29 por mes;
- ancora: R$ 24 por mes;
- anual com desconto.

### AI

Plano pago com IA acionada explicitamente pelo usuario.

Inclui:

- slash commands para prompts salvos;
- comandos como `/resumir`, `/reformular`, `/followup` e `/checklist`;
- prompts contextuais por site;
- workflows agenticos;
- integracoes basicas de produtividade;
- limites mensais de uso;
- historico de execucoes e controles de exclusao.

Preco inicial sugerido:

- faixa: R$ 49 a R$ 79 por mes;
- ancora: R$ 59 por mes;
- sem promessa de IA ilimitada.

## Times

Times ficam fora do MVP, mas devem ser previstos na arquitetura.

### Team

- bibliotecas compartilhadas;
- permissoes por membro;
- modelos oficiais da operacao;
- auditoria simples.

Ancora sugerida: R$ 49 por usuario/mes.

### Team AI

- tudo do Team;
- comandos de IA aprovados pelo workspace;
- limites por membro;
- logs de execucao;
- politicas de dados;
- revisao humana para fluxos sensiveis.

Ancora sugerida: R$ 119 por usuario/mes.

## Regras de privacidade

- Sync nao e consentimento para IA.
- Texto so deve ser enviado para IA quando o usuario acionar explicitamente um comando AI.
- O modo local deve continuar compreensivel e utilizavel sem conta.
- Cloud, billing, quotas, prompts proprietarios e workflows AI ficam no repo privado `copia-e-cola-cloud`.

## Consequencias

- A versao gratuita local continua forte como prova de confianca.
- O plano Pro pode monetizar sem custo variavel alto de IA.
- A camada AI tem preco maior e limites claros por custo operacional.
- O repo publico continua sendo portfolio e core auditavel, sem expor a operacao oficial.
