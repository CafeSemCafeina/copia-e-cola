# ADR 0003 - Empacotamento e pricing do produto

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; docs/adr/0002-brand-assets-read-only.md
Decisor: David Fiocchi

Status: accepted

## Contexto

O Copia e Cola precisa funcionar como software de produtividade open-source local-first e, ao mesmo tempo, permitir uma operacao oficial paga com sync, produtividade avancada e IA. A separacao precisa preservar confianca: usar ou sincronizar snippets nao deve implicar envio automatico de texto para IA.

O produto deve atender dois caminhos reais de cliente:

- usuario operacional que reutiliza textos em WhatsApp Web, CRMs, portais, atendimento e rotinas administrativas;
- usuario tech que reutiliza snippets de codigo, prompts personalizados, comandos, templates de PR/issue/review e instrucoes para agentes de IA.

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
- snippets de codigo e prompts personalizados como casos de uso nativos;
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
- snippets e dominios liberados para uso individual razoavel;
- uso operacional e tech no mesmo core: textos, prompts, comandos e snippets de codigo;
- sem IA.

Regra de produto:

- Free Cloud nao deve empurrar o usuario para Pro por limite artificial de snippets ou dominios;
- Pro deve ser comprado porque resolve outra dor, nao porque o core ficou travado;
- limites tecnicos podem existir apenas como protecao antiabuso, sem aparecer como proposta comercial;
- sem compartilhamento de equipe.

### Pro

Plano pago sem IA, focado em produtividade e organizacao.

Inclui:

- colecoes/pastas;
- atalhos e expansao por comandos curtos;
- variaveis manuais, como `{nome}`, `{data}`, `{processo}`;
- modelos com campos preenchiveis;
- historico/versionamento;
- regras por dominio ou URL;
- bibliotecas separadas por area, como atendimento, juridico, dev, prompts e suporte;
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
- comandos tech como `/commit`, `/review`, `/bug-report`, `/prompt-refine` e `/explain-code`;
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
- O Free Cloud tambem deve ser forte: login, sync e core completo para uso individual.
- O plano Pro deve monetizar dores diferentes, como organizacao avancada, automacao sem IA, templates, historico, bibliotecas por area, WhatsApp bot e fluxos de produtividade.
- A camada AI tem preco maior e limites claros por custo operacional.
- O usuario tech e prompt-heavy deve ser tratado como ICP real, nao como caso marginal.
- O repo publico continua sendo portfolio e core auditavel, sem expor a operacao oficial.
