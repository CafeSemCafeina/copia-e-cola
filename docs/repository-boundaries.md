# Fronteiras do repositorio

Status: politica operacional baseada em ADRs.

Decisoes relacionadas:

- `docs/adr/0001-open-core-and-cloud-boundary.md`;
- `docs/adr/0002-brand-assets-read-only.md`;
- `docs/adr/0003-product-packaging-and-pricing.md`.

Este repositorio publico existe para tres objetivos:

1. entregar o core local open-source do Copia e Cola;
2. demonstrar a logica de desenvolvimento, produto, UX, design e negocio;
3. manter artefatos de portfolio auditaveis sem abrir a operacao cloud oficial.

## Publico e MIT

O codigo-fonte necessario para a extensao local fica sob MIT:

- `entrypoints/`;
- `src/`;
- `tests/`;
- `scripts/`;
- `wxt.config.ts`;
- `package.json`;
- `tsconfig.json`.

## Publico, mas read-only para portfolio

Estes materiais podem ser lidos, estudados e citados, mas nao concedem direito de uso da marca Copia e Cola nem dos assets oficiais:

- `design-system/`;
- `store/`;
- `site/assets/`;
- `public/assets/`;
- `docs/PRD.md`;
- `docs/adr/`;
- `docs/archive/`;
- `specs/`.

Na pratica, um fork pode aproveitar o codigo MIT, mas deve trocar nome, logo, icones, screenshots, copy de loja e identidade visual.

## Privado

Deve ficar fora deste repositorio:

- backend de sync;
- login Google/OAuth;
- billing e webhooks;
- banco de dados de usuarios;
- infraestrutura e deploy;
- prompts proprietarios da camada AI;
- workflows agenticos pagos;
- chaves, tokens, `.env` e configuracoes de producao;
- dados reais de usuarios.

O destino recomendado e um repositorio irmao privado chamado `copia-e-cola-cloud`.

## Regra de arquitetura

O repo publico pode conter contratos e interfaces para sync/AI no futuro, desde que nao contenha implementacao oficial, credenciais, prompts privados ou acoplamento a infraestrutura fechada.

Exemplo aceitavel:

```ts
export interface SyncProvider {
  pull(): Promise<unknown[]>;
  push(items: unknown[]): Promise<void>;
}
```

Exemplo que deve ficar no repo privado:

```ts
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
```
