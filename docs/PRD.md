# PRD - Copia e Cola

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; docs/adr/0003-product-packaging-and-pricing.md
Decisor: David Fiocchi

Status: artefato versionado de produto e portfólio.

Este PRD descreve a tese do produto e o recorte do MVP local. Decisões formais de arquitetura, marca, cloud e monetização ficam registradas em ADRs em `docs/adr/`.

## 1. Resumo

Copia e Cola é um software de produtividade open-source e local-first para guardar textos, snippets de código, prompts, protocolos e modelos de resposta por contexto de navegação. O primeiro produto será uma extensão de navegador que mostra, salva e copia itens associados ao domínio atual.

O produto nasce como ferramenta simples para pessoas que vivem alternando entre sistemas e repetindo texto com pequenas variações. O valor inicial não está em automação complexa, mas em reduzir o retrabalho de buscar, reescrever ou copiar textos de lugares improvisados.

Existem dois caminhos de adoção relevantes desde o início:

- operador brasileiro que alterna entre WhatsApp Web, tribunais, CRMs, portais públicos e ferramentas internas;
- usuário tech que alterna entre IDE, GitHub, documentação, chats de IA, prompts personalizados, snippets de código, comandos e respostas técnicas recorrentes.

## 2. Problema

Profissionais operacionais repetem pequenos textos e dados durante o dia:

- mensagens de atendimento;
- prompts;
- números de processo ou protocolo;
- modelos curtos de acompanhamento;
- instruções para cliente;
- trechos de documentação interna;
- respostas recorrentes em portais, CRMs e WhatsApp Web.

Usuários tech também repetem blocos reutilizáveis durante o dia:

- snippets de código;
- prompts personalizados;
- comandos de terminal;
- templates de PR, issue, commit e review;
- respostas técnicas recorrentes;
- instruções para agentes de IA;
- trechos de documentação e exemplos.

Hoje isso costuma ficar espalhado em bloco de notas, mensagens para si mesmo, planilhas, documentos, favoritos, histórico de clipboard ou memória individual. O problema aumenta quando o contexto muda: o que serve para um tribunal não serve para outro, e o que serve para WhatsApp não serve para um CRM.

No caso tech, o mesmo problema aparece entre IDE, GitHub, ChatGPT/Claude, documentação, terminal e ferramentas internas. O usuário sabe o que quer reutilizar, mas perde tempo procurando a versão certa, adaptando o texto e conferindo se colou no contexto correto.

## 3. Hipótese

Se o usuário abrir uma extensão e encontrar automaticamente os textos daquele site, ele economiza tempo e reduz carga cognitiva sem precisar organizar uma biblioteca complexa.

Hipótese principal do MVP:

> Um clipboard contextual por domínio é útil o bastante para virar hábito diário em operações brasileiras.

## 4. Usuários iniciais

### Usuário primário

- secretária jurídica;
- advogado solo;
- assistente administrativo;
- paralegal;
- atendente comercial;
- operador de CRM;
- profissional que usa WhatsApp Web e portais públicos no mesmo fluxo.

### Usuário secundário

- usuário intensivo de IA;
- desenvolvedor;
- founder técnico;
- analista técnico;
- prompt engineer ou usuário avançado de LLM;
- fundador técnico;
- analista de suporte;
- vendedor consultivo;
- pessoa que alterna entre muitas ferramentas web.

## 5. Proposta de valor

### Frase curta

O texto certo aparece no contexto certo.

### Promessa do MVP

Salvar, organizar e reutilizar textos, prompts e snippets por domínio, sem conta, sem backend obrigatório e com dados locais por padrão.

## 6. Escopo do MVP

### Inclui

- extensão Chrome/Edge Manifest V3;
- detecção do domínio da aba ativa;
- formulário para criar item com título opcional e conteúdo obrigatório;
- listagem dos itens do domínio atual;
- copiar item com um clique;
- editar item;
- excluir item;
- busca local dentro do domínio;
- item global opcional, disponível em todos os domínios;
- exportação e importação JSON;
- armazenamento em `chrome.storage.local`;
- README com instalação local.

### Não inclui no MVP

- login;
- backend;
- sync entre dispositivos;
- IA;
- colaboração em equipe;
- Chrome Web Store;
- monetização ativa;
- inserção automática dentro de campos da página;
- scraping ou leitura profunda do conteúdo da página.

## 7. Modelo de dados inicial

```json
{
  "id": "uuid",
  "scope": "domain",
  "domain": "web.whatsapp.com",
  "title": "Follow-up de documentos",
  "content": "Olá, tudo bem? Passando para lembrar...",
  "favorite": false,
  "createdAt": "2026-06-19T12:00:00.000Z",
  "updatedAt": "2026-06-19T12:00:00.000Z",
  "lastCopiedAt": null
}
```

Escopos previstos:

- `domain`: aparece apenas no domínio atual;
- `global`: aparece em todos os domínios.

## 8. Experiência do usuário

Fluxo principal:

1. Usuário abre um site.
2. Clica na extensão.
3. Vê o domínio atual no topo.
4. Cola um conteúdo e, se quiser, dá um título.
5. Salva.
6. O item aparece na lista daquele contexto.
7. Em outra visita ao mesmo site, copia o item com um clique.

Estado vazio:

> Nenhum item salvo para este site ainda.

Feedbacks mínimos:

- `Salvo`;
- `Copiado`;
- `Atualizado`;
- `Excluído`;
- erro de importação JSON inválido.

## 9. Critérios de sucesso do MVP

Produto:

- salvar um item em menos de 10 segundos;
- copiar um item em 1 clique;
- não misturar itens de domínios diferentes;
- funcionar sem internet após instalado;
- permitir exportar dados do usuário.

Validação:

- uso real em 3 contextos: WhatsApp Web, portal jurídico e ferramenta Syntelix;
- pelo menos 20 itens salvos durante teste interno;
- pelo menos 5 usos em dias diferentes pelo mesmo usuário;
- identificação clara de quais itens viram hábito.

## 10. Estratégia local-first

O núcleo gratuito deve funcionar sem servidor. Isso é importante porque o usuário pode salvar dados sensíveis, como modelos de atendimento, números de processo, protocolos e mensagens internas.

Qualquer recurso que envie dados para fora do navegador deve ser:

- opcional;
- claro;
- reversível;
- exportável;
- com explicação de privacidade em português.

## 11. Expansão futura

### Fase 0.1 - MVP local

- extensão local;
- CRUD por domínio;
- itens globais;
- busca simples;
- import/export.

### Fase 0.2 - Produto local melhor

- favoritos;
- tags;
- ordenação por uso recente;
- atalhos de teclado;
- histórico de cópias;
- templates com variáveis simples, como `{{nome}}` e `{{processo}}`.

### Fase 0.3 - Distribuição

- empacotamento;
- página pública;
- documentação de instalação;
- Chrome Web Store;
- Firefox, se houver demanda.

### Fase 0.4 - Monetização leve

As decisões de empacotamento, pricing e separação entre Open Source Local, Essencial, Fluxo, Aceleracao e Operacao ficam em `docs/adr/0003-product-packaging-and-pricing.md`.

Regra do PRD:

- o MVP continua local-first e sem backend obrigatório;
- monetização não deve alterar a promessa de confiança do core local;
- recursos que enviam dados para fora do navegador precisam ser opcionais, claros e reversíveis.

### Fase 0.5 - Ponte Syntelix/Fidelia

- kits para jurídico;
- biblioteca de mensagens WhatsApp-first;
- prompts para triagem, qualificação e follow-up;
- integração futura com produtos Syntelix;
- camada de memória operacional para fluxos da Fidelia.

## 12. Riscos

- virar apenas mais um text expander genérico;
- pedir permissões demais e reduzir confiança;
- misturar dados sensíveis com sync prematuro;
- adicionar IA antes de validar o comportamento básico;
- criar organização complexa demais para usuário operacional.

## 13. Decisões iniciais

- Começar por extensão Chrome/Edge.
- Usar domínio como unidade principal de contexto.
- Manter backend fora do MVP.
- Versionar PRD, specs e ADRs como material público de portfólio.
- Registrar decisões estruturais como ADR, não como arquivo solto em `docs/`.
