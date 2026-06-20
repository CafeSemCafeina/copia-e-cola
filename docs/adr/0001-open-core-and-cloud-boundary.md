# ADR 0001 - Core publico e cloud privado

Status: accepted

## Contexto

O Copia e Cola deve funcionar como experimento publico de portfolio e como produto com potencial de planos pagos. O core local precisa ser auditavel e reutilizavel, mas a operacao oficial de cloud, billing, sync e IA nao deve ser exposta no mesmo repositorio.

## Decisao

Manter o repositorio `copia-e-cola` como open-source local-first sob MIT para o core da extensao.

Criar um repositorio privado separado, `copia-e-cola-cloud`, para:

- auth;
- sync;
- billing;
- quotas;
- integracoes;
- workflows AI;
- prompts privados;
- infraestrutura.

O repo publico pode conter documentacao, specs e interfaces de alto nivel, mas nao implementacoes cloud oficiais.

## Consequencias

- O portfolio continua publico e forte.
- Forks podem usar o core, mas nao acessam a operacao oficial.
- O paywall real fica no servidor, nao em botoes do frontend.
- O risco de vazamento de secrets, prompts e regras comerciais cai.
- Mudancas futuras de sync/AI precisam respeitar o limite entre contrato publico e implementacao privada.
