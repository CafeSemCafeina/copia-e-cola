# AGENTS.md

Data da decisão: 2026-06-20
Depends on: CONTRIBUTING.md
Decisor: David Fiocchi

Instruções de comportamento para agentes de IA (Claude Code, Codex e similares) que trabalham neste repositório. Para diretrizes humanas completas, veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Idioma

- Escreva código, commits, PRs e documentação em **português do Brasil**, salvo quando o arquivo já seguir outro padrão (ex.: termos técnicos consagrados).

## Fluxo de Git e Pull Requests

A unidade de uma PR é **uma mudança lógica coesa e mesclável**, não um lote grande acumulado. O critério é coesão, não tamanho.

- **Sempre `branch → PR`. Nunca commite direto no `main`**, nem para mudanças triviais.
- Uma branch por assunto, com prefixo de tipo: `docs/...`, `fix/...`, `feat/...`, `chore/...`.
- Mudanças simples (typo, uma linha, ajuste de estilo) também viram a própria PR — não acumule.
- Não misture assuntos na mesma PR. Separe correção, refatoração e nova feature.
- PR grande só quando a mudança é indivisível (refatoração mecânica, código gerado, feature que não funciona pela metade). O alerta é "muitos assuntos", não "muitas linhas".
- Mensagens de commit em [Conventional Commits](https://www.conventionalcommits.org/) (`docs:`, `fix:`, `feat:`, `chore:`).
- Preencha o [template de PR](.github/pull_request_template.md): resumo, motivo, mudanças, como testar e riscos.

## Automação já configurada

- **Delete branch on merge** ativo no GitHub — a branch remota é removida ao mesclar o PR.
- Alias `git cleanup` remove branches locais já mescladas (`fetch --prune` + `branch --merged`). Use após merges; não apague `main` nem a branch atual.

## Diretrizes de produto (resumo)

- Projeto **local-first**: não adicione backend obrigatório ao núcleo.
- Não envie conteúdo do usuário para serviços externos sem opt-in explícito.
- Mantenha o escopo pequeno e verificável; valide o fluxo básico antes de adicionar complexidade.
- Comunicação direta e técnica, sem exagero comercial.
