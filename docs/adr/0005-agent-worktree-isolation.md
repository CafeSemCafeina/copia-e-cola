# ADR 0005 - Isolamento de agents com git worktrees

Data da decisão: 2026-06-20
Depends on: docs/README.md; docs/repository-boundaries.md
Decisor: David Fiocchi

Status: accepted

## Contexto

O projeto pode ser trabalhado por mais de um agent, ou por um agent em paralelo com edicoes humanas. Foi observado que usar o mesmo checkout para varios agents causa interferencia operacional:

- um agent pode trocar a branch com `git switch` e afetar todos que usam a mesma pasta;
- alteracoes nao commitadas de tarefas diferentes aparecem misturadas;
- artefatos como `dist/`, screenshots, caches e arquivos temporarios podem se cruzar;
- fica dificil saber qual agent alterou qual arquivo;
- commits deixam de ser atomicos porque passam a agrupar trabalho de contextos diferentes.

Branch Git sozinha nao isola ambiente. Ela isola historico, mas o checkout fisico continua compartilhado.

## Decisao

Cada spec, tarefa paralela ou agent deve trabalhar em um git worktree proprio.

Regra padrao:

```powershell
git switch main
git pull --ff-only
git worktree add .worktrees/<feature> -b codex/<feature> main
cd .worktrees/<feature>
```

Exemplo:

```powershell
git worktree add .worktrees/slash-command-expander -b codex/slash-command-expander main
git worktree add .worktrees/payment-flow -b codex/payment-flow main
git worktree add .worktrees/docs-update -b codex/docs-update main
```

Cada agent deve ser iniciado dentro da pasta do seu worktree, nao no checkout raiz compartilhado.

## Politica de Git

- Uma spec ou tarefa independente deve ter uma branch `codex/<feature>`.
- A branch deve viver em um worktree proprio quando houver qualquer chance de trabalho paralelo.
- Commits devem ser conventional commits em ingles.
- Commits devem ser pequenos e atomicos por parcela coerente de trabalho.
- Alteracoes nao relacionadas vistas no working tree devem ser preservadas e nao devem entrar no commit da tarefa.
- Tarefas dependentes nao devem ser paralelizadas sem uma branch-base explicita; devem rodar em sequencia ou rebasear sobre a dependencia.
- Integracao deve acontecer por PR ou merge local depois que os checks passarem.

## Limites do isolamento

Worktrees separam:

- branch atual;
- working tree;
- arquivos nao commitados;
- artefatos de build dentro da pasta;
- commits da tarefa.

Worktrees nao separam automaticamente:

- credenciais locais;
- cache global de ferramentas;
- portas de dev server;
- perfil local de navegador, salvo quando o script cria perfil temporario;
- recursos externos como APIs, bancos e SaaS.

Quando houver dev server, smoke test ou browser automation, cada agent deve usar portas e perfis temporarios proprios.

## Limpeza

Depois de integrar ou descartar uma branch, remover o worktree:

```powershell
git worktree remove .worktrees/<feature>
git branch -d codex/<feature>
git worktree prune
```

Se o worktree foi criado pela ferramenta/harness e nao manualmente pelo projeto, a ferramenta deve ser responsavel pela limpeza.

## Consequencias

- Reduz conflito invisivel entre agents.
- Mantem diffs menores e commits mais auditaveis.
- Evita que `git switch` em uma tarefa mude a branch de outra.
- Aumenta um pouco o custo operacional por exigir uma pasta por tarefa.
- Facilita revisar, testar, rebasear e descartar trabalho de agents sem afetar o checkout principal.
