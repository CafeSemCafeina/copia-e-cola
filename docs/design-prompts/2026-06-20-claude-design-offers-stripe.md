# Prompt Claude Design - Ofertas e Stripe

Data da decisão: 2026-06-20
Depends on: docs/adr/0003-product-packaging-and-pricing.md; docs/adr/0004-stripe-offer-and-checkout-flow.md; design-system/screens/payment/checkout-copia-e-cola-pro.html
Decisor: David Fiocchi

Use este prompt no Claude Design para gerar as telas de ofertas e pagamento do Copia e Cola com a nova arquitetura de planos.

## Prompt

Voce esta trabalhando no design system do produto Copia e Cola. Use como referencia visual obrigatoria as telas e tokens que voce ja tem no projeto:

- `design-system/screens/telas-da-extensao.html`
- `design-system/screens/payment/checkout-copia-e-cola-pro.html`
- tokens de cor, tipografia, spacing, radius e motion do Copia e Cola
- componentes existentes: Button, Icon, IconButton, Badge, Input, SearchInput, Textarea, Toast, EmptyState, ClipboardItem, DomainHeader

Crie um conjunto de telas para a pagina de ofertas e fluxo de pagamento do Copia e Cola, mantendo a linguagem visual atual: brasileira, sobria, produtiva, local-first, sem hype de IA, sem gradientes roxos, sem visual SaaS generico.

## Mensagem central

O Copia e Cola e um software de produtividade.

Mensagem principal:

> Produtividade para textos que voce repete todos os dias.

Submensagem:

> Salve textos, prompts, comandos e snippets por contexto. Use o Essencial de graca com sync. Assine o Fluxo quando precisar transformar repeticao em modelos, bibliotecas e fluxos de trabalho.

Promessa numerica:

> Economize 10 a 30 segundos a cada texto repetitivo.

Promessa agregada:

> Para quem reutiliza 20 a 40 textos por dia, isso recupera 1 a 2 horas por semana.

## Planos

Nao use os nomes Free, Pro, AI ou Team como nomes principais. Use estes nomes:

1. Essencial
2. Fluxo
3. Aceleracao
4. Operacao

### Essencial

Posicionamento:

> Produtividade basica completa.

Descricao:

> Para parar de procurar e reescrever textos repetitivos.

Preco:

> R$ 0

Inclui:

- login Google;
- sync entre dispositivos;
- snippets e dominios liberados para uso individual razoavel;
- textos, prompts, comandos e snippets de codigo;
- exportacao/importacao;
- sem IA.

CTA:

> Comecar gratis

Observacao:

> O Essencial nao deve parecer limitado artificialmente. Ele e um plano gratuito forte.

### Fluxo

Posicionamento:

> Transforme repeticao em processo.

Descricao:

> Para transformar textos repetitivos em modelos, bibliotecas e fluxos de produtividade.

Preco:

> R$ 24/mes

Inclui:

- bibliotecas por area;
- templates com variaveis;
- historico e versionamento;
- regras por dominio ou URL;
- atalhos avancados;
- automacoes de fluxo;
- bot WhatsApp, se fizer sentido visualmente como "em breve".

CTA:

> Assinar Fluxo

Importante:

> Fluxo nao vende mais quantidade. Fluxo vende organizacao, adaptacao, historico e produtividade estruturada.

### Aceleracao

Posicionamento:

> Transforme contexto em resposta pronta.

Descricao:

> Para usar IA em slash commands, prompts e workflows quando o texto precisa ser transformado.

Preco:

> R$ 59/mes

Inclui:

- slash commands com IA;
- transformar texto em follow-up, checklist, resumo ou resposta;
- comandos tech como `/commit`, `/review`, `/bug-report`, `/prompt-refine`;
- workflows agenticos;
- historico de execucoes.

CTA:

> Entrar na lista

Observacao:

> Aceleracao pode aparecer como plano futuro/em breve se a tela precisar mostrar foco comercial atual em Fluxo.

### Operacao

Posicionamento:

> Produtividade padronizada para times.

Descricao:

> Para times que precisam compartilhar bibliotecas, modelos oficiais e permissoes.

Preco:

> Sob consulta ou R$ 49/usuario/mes como ancora visual secundaria.

Inclui:

- bibliotecas compartilhadas;
- permissoes;
- modelos oficiais;
- auditoria;
- governanca;
- opcionalmente Operacao com Aceleracao no futuro.

CTA:

> Falar sobre time

## Telas obrigatorias

Crie pelo menos estas telas/estados:

1. Landing/ofertas
   - top bar com logo, GitHub, Entrar, Comecar gratis;
   - hero com headline, subheadline, promessa numerica e CTA;
   - bloco "Onde o tempo some" com dores;
   - bloco "Quanto tempo volta" com ganho estimado;
   - cards dos planos Essencial, Fluxo, Aceleracao e Operacao;
   - comparacao por estagio de produtividade;
   - bloco de confianca: open-source, local-first, sync opcional, IA somente por comando explicito;
   - FAQ.

2. Selecao de plano
   - estado focado em Fluxo como upgrade recomendado;
   - Essencial mostrado como plano atual/gratuito;
   - toggle mensal/anual;
   - CTA `Assinar Fluxo`.

3. Checkout Fluxo
   - manter estrutura visual similar a `checkout-copia-e-cola-pro.html`;
   - trocar Pro por Fluxo;
   - pagamento seguro;
   - resumo do pedido;
   - email;
   - opcao Stripe-hosted como fluxo real recomendado;
   - nao criar UI de cartao complexa se a decisao visual puder representar redirect para Stripe Checkout.

4. Sucesso
   - titulo: `Fluxo ativado`;
   - texto: `Suas bibliotecas e modelos avancados ja estao disponiveis.`;
   - CTA principal: `Abrir a extensao`;
   - CTA secundario: `Ver recursos do Fluxo`.

5. Portal/gerenciar assinatura
   - estado simples com plano atual;
   - botao `Gerenciar assinatura`;
   - texto dizendo que o gerenciamento abre o portal seguro da Stripe.

## Copy exata importante

Use estas frases:

- `O texto certo no contexto certo.`
- `Comece no Essencial. Evolua para Fluxo quando seus textos virarem processo.`
- `Use Aceleracao quando precisar transformar contexto em resposta pronta.`
- `Leve para Operacao quando o time precisar trabalhar no mesmo padrao.`
- `Sync nao e consentimento para IA.`
- `Seus textos so vao para IA quando voce aciona um comando de IA.`
- `O core e open-source.`
- `Snippets e dominios liberados para uso individual razoavel.`
- `Limites tecnicos existem apenas para antiabuso.`

## Regras visuais

- Use o verde Copia e Cola como cor principal.
- Use superficies claras, bordas sutis, radius pequeno/medio e sombra leve.
- Mantenha densidade de ferramenta produtiva, nao landing page exageradamente heroica.
- Evite roxo, azul escuro dominante, efeitos neon, glassmorphism, blobs e gradientes decorativos.
- Nao use imagens stock.
- Nao apresente IA como magia.
- Mostre prompts e snippets de codigo como caso de uso real junto com atendimento/operacao.

## Resultado esperado

Entregue uma tela navegavel no estilo das telas atuais do design system, com estados suficientes para eu exportar e versionar no repositorio como referencia visual.
