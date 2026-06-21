# Contribuindo

Data da decisão: 2026-06-20
Depends on: README.md
Decisor: David Fiocchi

Obrigado por considerar contribuir com o Copia e Cola.

## Como contribuir

1. Abra uma issue descrevendo o problema, melhoria ou proposta.
2. Mantenha o escopo pequeno e verificável.
3. Priorize privacidade, simplicidade e funcionamento local.
4. Antes de enviar um pull request, descreva:
   - o que mudou;
   - como foi testado;
   - quais riscos ou limitações continuam abertos.

## Fluxo de Git e Pull Requests

A unidade de uma pull request é **uma mudança lógica coesa e mesclável**, não um lote grande acumulado. O critério não é tamanho, é coesão: se a mudança pode ser revisada e mesclada sozinha, ela vira uma PR — mesmo que seja simples (um typo, uma linha, um ajuste de estilo).

- Branch por assunto, com prefixo de tipo: `docs/...`, `fix/...`, `feat/...`, `chore/...`.
- Nunca commite direto no `main`; sempre `branch → PR`, inclusive para mudanças triviais.
- Não misture assuntos numa mesma PR. Separe correções, refatorações e novas features.
- Uma PR grande só se justifica quando a mudança é indivisível (refatoração mecânica, código gerado, feature que não funciona pela metade). O sinal de alerta é "muitos assuntos", não "muitas linhas".
- Use mensagens de commit no padrão [Conventional Commits](https://www.conventionalcommits.org/) (`docs:`, `fix:`, `feat:`, `chore:`, `fix(ci):`...).

### Automação do repositório

- **Delete branch on merge** está ativado no GitHub: a branch remota é removida automaticamente ao mesclar o PR.
- Para limpar as branches locais já mescladas, use o alias `git cleanup` (vai para `main`, faz `fetch --prune` e remove as branches locais mescladas):

  ```sh
  git config --global alias.cleanup '!git checkout main && git fetch --prune && git branch --merged main | grep -vE "^[*+]| main$" | xargs -r git branch -d'
  ```

### Fluxo padrão

```sh
git switch main && git pull
git switch -c docs/ajuste-link   # uma branch = um assunto
# edite, commite com tipo: docs/fix/feat/chore...
git push -u origin docs/ajuste-link
gh pr create                     # abra o PR mesmo que seja simples
# após o merge: a remota some sozinha; rode `git cleanup` para limpar a local
```

## Diretrizes de produto

- Não adicione backend obrigatório ao núcleo local-first.
- Não envie conteúdo do usuário para serviços externos sem opt-in explícito.
- Evite funcionalidades complexas antes de validar o fluxo básico de salvar, listar e copiar por domínio.
- Prefira textos, exemplos e casos de uso em português do Brasil.

## Padrão de comunicação

Use linguagem direta, técnica e sem exagero comercial. Este projeto deve ser útil para operações reais, especialmente pequenas equipes que trabalham com WhatsApp, jurídico, portais públicos, CRMs e sistemas legados.
