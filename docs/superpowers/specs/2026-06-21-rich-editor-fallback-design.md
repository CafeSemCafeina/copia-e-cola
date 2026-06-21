# Rich Editor Fallback Design

Data da decisão: 2026-06-21
Depends on: docs/superpowers/specs/2026-06-20-slash-command-expander-design.md; issues #2; issues #12
Decisor: David Fiocchi

## Objetivo

Melhorar a confiabilidade dos slash commands em editores ricos e sites difíceis, sem arriscar corromper o texto, o cursor ou o estado interno do editor.

A issue #2 aponta falhas em WhatsApp Web e outros sistemas como ChatGPT, Gemini, Claude e Google Docs. Esses ambientes não se comportam como um `input`, `textarea` ou `contenteditable` simples: eles mantêm estado interno próprio, normalizam o DOM e podem ignorar ou sobrescrever mutações feitas diretamente pelo content script.

Este design define uma contenção robusta: a extensão continua tentando autoexpansão onde é seguro, mas quando reconhece um comando válido e não consegue inserir com confiança, mostra uma sugestão local com ações explícitas de `Inserir` e `Copiar`.

## Não Objetivos

- Não resolver comandos inexistentes. Esse fluxo fica separado na issue #12.
- Não criar snippets automaticamente.
- Não adicionar IA, variáveis, pipelines ou transformação de texto.
- Não prometer suporte pleno a Google Docs na primeira implementação.
- Não manter uma coleção extensa de hacks frágeis por site como arquitetura principal.

## Comportamento de Produto

O runtime deve separar três estados:

1. **Comando reconhecido e campo seguro**
   - A extensão substitui automaticamente o comando pelo conteúdo salvo.
   - Esse fluxo continua valendo para `input`, `textarea` e `contenteditable` simples quando o range é confiável.

2. **Comando reconhecido, mas inserção automática falhou ou o editor é arriscado**
   - A extensão mostra uma sugestão discreta perto do campo ativo.
   - A sugestão exibe título do snippet, preview curto do conteúdo e dois botões:
     - `Inserir`: tenta uma estratégia alternativa de inserção no campo ativo.
     - `Copiar`: copia o conteúdo do snippet para o clipboard.
   - Se `Inserir` falhar, a UI tenta copiar o conteúdo e informa se a cópia ficou pronta para colar manualmente.

3. **Comando inexistente**
   - A issue #2 não deve exibir sugestão de fallback para esse caso.
   - A melhoria de sugerir criação de snippet para comando inexistente fica na issue #12.

A regra de segurança é: a extensão nunca deve remover o comando digitado sem conseguir inserir o conteúdo ou oferecer um fallback visível.

## Arquitetura

O content script deve deixar de tratar expansão como um booleano simples. Em vez disso, deve receber um resultado tipado do motor de expansão.

### Fluxo

1. `entrypoints/content.ts` escuta eventos de entrada e carrega comandos aplicáveis ao domínio atual.
2. `src/lib/text-expansion.ts` identifica se há comando conhecido no texto antes do cursor.
3. `src/lib/dom-expansion.ts` tenta inserir o conteúdo e retorna um resultado tipado.
4. Quando o resultado indica editor não suportado ou falha de inserção para comando reconhecido, `content.ts` aciona a UI de fallback.
5. A UI permite `Inserir` ou `Copiar`, sem roubar foco de forma destrutiva.

Em editores que não expõem texto confiável via DOM, o content script deve manter um buffer curto dos caracteres digitados recentemente por eventos de teclado/entrada. Esse buffer serve apenas para detectar um comando conhecido no sufixo recente e deve ser descartado ao trocar foco, pressionar `Escape`, navegar ou após alguns segundos sem digitação. Ele não deve armazenar histórico longo nem conteúdo completo do campo.

### Resultado Tipado

Um modelo inicial suficiente:

```ts
type ExpansionResult =
  | { status: "expanded"; itemId: string }
  | { status: "no_match" }
  | { status: "unsupported_editor"; match: TextExpansionMatch; reason: string }
  | { status: "failed_insert"; match: TextExpansionMatch; reason: string };
```

Esse contrato separa claramente:

- ausência de comando;
- comando reconhecido;
- sucesso de inserção;
- editor arriscado;
- tentativa que falhou.

## Componentes

### `src/lib/text-expansion.ts`

Continua puro e testável. Responsável por:

- detectar comando conhecido no texto antes do cursor;
- retornar range e conteúdo de substituição;
- não conhecer DOM, sites ou clipboard.

### `src/lib/dom-expansion.ts`

Passa a ser responsável por:

- tentar autoexpansão em campos seguros;
- validar se a mutação persistiu quando possível;
- retornar `unsupported_editor` quando o campo ou editor não for confiável;
- retornar `failed_insert` quando a tentativa não produzir o texto esperado.

### `src/lib/editor-detection.ts`

Novo módulo para classificar risco do alvo atual. Responsável por:

- identificar `input` e `textarea` como seguros quando editáveis;
- identificar `contenteditable` simples como risco médio;
- classificar domínios conhecidos como difíceis;
- classificar Google Docs como fallback direto na primeira versão.

Classificação inicial:

- **Seguro**: `input` text-like e `textarea`.
- **Médio**: `contenteditable` simples, com range mapeável.
- **Difícil conhecido**: `web.whatsapp.com`, `chatgpt.com`, `claude.ai` e `gemini.google.com`.
- **Muito difícil**: `docs.google.com`, começando direto com fallback UI.

### UI de Fallback

Novo módulo: `src/lib/fallback-suggestion.ts`.

Responsabilidades:

- renderizar uma sugestão pequena perto do campo ativo;
- mostrar título e preview do snippet;
- oferecer botões `Inserir` e `Copiar`;
- fechar ao pressionar `Esc`, clicar fora, trocar foco ou após feedback de sucesso;
- evitar conflito com CSS da página usando Shadow DOM ou classes prefixadas;
- nunca bloquear a digitação normal.

## Inserir e Copiar

### Botão `Inserir`

O botão `Inserir` deve:

1. tentar devolver o foco ao editor original;
2. usar uma estratégia alternativa de inserção mais compatível com editores ricos;
3. validar se o conteúdo entrou quando isso for mensurável;
4. se falhar, preservar o texto atual, copiar o conteúdo quando o clipboard estiver disponível e mostrar feedback de fallback.

O botão `Inserir` é uma tentativa assistida, não uma promessa absoluta.

### Botão `Copiar`

O botão `Copiar` deve ser o caminho confiável:

- usa `navigator.clipboard.writeText()` quando disponível;
- mostra feedback `Copiado`;
- se a cópia falhar, exibe erro discreto e não tenta mutações inseguras.

## Regras Por Site

### WhatsApp Web

WhatsApp Web deve ser tratado como editor difícil conhecido. A primeira implementação pode tentar inserção assistida, mas deve cair rapidamente para fallback UI se não confirmar sucesso.

### ChatGPT, Claude e Gemini

Chats de IA são prioridade de produto para prompts, mas também usam editores controlados por frameworks. A estratégia deve ser:

- tentar caminho seguro quando o alvo for `textarea`;
- tratar `contenteditable` e editores aninhados como risco médio/difícil;
- mostrar fallback se a mutação não persistir.

### Google Docs

Google Docs deve começar em fallback direto. A primeira versão não deve tentar mutação agressiva no documento.

Motivo: o editor é altamente customizado e pode não expor um buffer DOM confiável. Uma falha aqui pode causar perda de foco, seleção ou texto.

## Tratamento de Erros

Falhas runtime devem ser locais e não destrutivas:

- storage indisponível: não mostra fallback;
- comando inexistente: não mostra fallback da issue #2;
- campo não suportado sem comando reconhecido: não faz nada;
- comando reconhecido em editor arriscado: mostra fallback;
- tentativa de inserção falha: preserva texto e oferece cópia;
- clipboard indisponível: mostra erro discreto.

## Testes

### Unitários

Cobrir:

- `text-expansion` continua identificando comandos conhecidos;
- resultado tipado diferencia `expanded`, `no_match`, `unsupported_editor` e `failed_insert`;
- detecção de editor classifica campos simples, editores ricos e domínios difíceis.

### DOM/local Smoke

Adicionar ou expandir página local de smoke com:

- `input`;
- `textarea`;
- `contenteditable` simples;
- `contenteditable` aninhado com spans;
- editor simulado que desfaz mutação ou não preserva texto.

Verificar:

- autoexpansão continua funcionando em campos seguros;
- fallback UI aparece quando há comando válido e inserção falha;
- fallback UI não aparece para comando inexistente;
- `Copiar` copia o conteúdo correto;
- `Inserir` tenta inserir e, se falhar, aciona feedback de fallback.

### Validação Manual Guiada

Antes de fechar a implementação, validar manualmente:

- WhatsApp Web: comando válido deve inserir ou mostrar fallback sem perder texto;
- ChatGPT: comando válido deve inserir ou mostrar fallback;
- Claude: comando válido deve inserir ou mostrar fallback;
- Gemini: comando válido deve inserir ou mostrar fallback;
- Google Docs: deve preferir fallback UI sem tentativa agressiva de mutação.

## Critérios de Aceite

- A extensão nunca remove o comando digitado sem inserir o conteúdo ou oferecer fallback.
- A UI de fallback aparece apenas para comando existente.
- A UI de fallback não aparece para comando inexistente.
- O botão `Copiar` é confiável e fornece feedback claro.
- O botão `Inserir` tenta inserção assistida e cai para cópia/feedback quando necessário.
- Google Docs começa como fallback direto.
- WhatsApp Web e chats de IA são tratados como difíceis, não como `contenteditable` simples.
- O usuário consegue continuar digitando se ignorar a sugestão.
- `npm run check` deve passar.

## Sequenciamento Sugerido

1. Introduzir `ExpansionResult` e adaptar os testes existentes sem mudar comportamento.
2. Adicionar detecção de editor/site e testes unitários.
3. Criar UI de fallback mínima com `Inserir` e `Copiar`.
4. Integrar fallback apenas quando há comando reconhecido e falha de inserção.
5. Expandir smoke local para editores difíceis simulados.
6. Fazer validação manual em WhatsApp Web e chats de IA.
7. Deixar Google Docs em fallback direto até haver investigação específica.

## Riscos

- Shadow DOM pode reduzir conflito visual, mas posicionamento perto do campo pode variar por site.
- `navigator.clipboard` depende de permissões/contexto e pode falhar em alguns ambientes.
- Inserção assistida em editores ricos continuará dependente de comportamento de cada site.
- Google Docs pode exigir abordagem separada e não deve bloquear a contenção inicial.

## Decisão

Adotar fallback UI-first para editores ricos: autoexpansão continua em campos seguros; editores difíceis recebem assistência explícita quando um comando existente não puder ser inserido com segurança.
