# ADR 0004 - Pagina de ofertas e fluxo Stripe

Data da decisão: 2026-06-20
Depends on: docs/adr/0001-open-core-and-cloud-boundary.md; docs/adr/0003-product-packaging-and-pricing.md; design-system/screens/payment/README.md
Decisor: David Fiocchi

Status: accepted

## Contexto

O Copia e Cola deve vender produtividade, nao quantidade de snippets. O Essencial deve ser forte e liberado para uso individual razoavel. O Fluxo deve ser comprado porque resolve outra dor: produtividade estruturada, modelos reutilizaveis, organizacao avancada e automacoes de fluxo.

Existe uma referencia visual versionada em `design-system/screens/payment/checkout-copia-e-cola-pro.html`, importada do pacote `payment_screens.zip`.

## Decisao

A pagina de ofertas deve ser publica/portfolio no repo `copia-e-cola`, mas o fluxo real de pagamento deve ser implementado no repo privado `copia-e-cola-cloud`.

### Mensagem principal

Headline:

> Produtividade para textos que voce repete todos os dias.

Subheadline:

> Salve textos, prompts, comandos e snippets por contexto. Use o Essencial de graca com sync. Assine o Fluxo quando precisar transformar repeticao em modelos, bibliotecas e fluxos de trabalho.

Promessa numerica conservadora:

> Economize 10 a 30 segundos a cada texto repetitivo.

Promessa agregada:

> Para quem reutiliza 20 a 40 textos por dia, isso recupera 1 a 2 horas por semana.

### Estrutura exata da pagina de ofertas

1. Top bar
   - Logo Copia e Cola.
   - Link para GitHub.
   - Link para entrar.
   - CTA principal: `Comecar gratis`.

2. Hero
   - Titulo: `Pare de procurar, reescrever e adaptar o mesmo texto.`
   - Subtitulo: `O Copia e Cola coloca o texto certo no contexto certo: mensagens, prompts, comandos, snippets de codigo e modelos de resposta.`
   - CTA principal: `Comecar gratis`.
   - CTA secundario: `Ver como funciona`.
   - Prova curta: `Local-first. Open-source. Sync opcional.`

3. Bloco de dores
   - `Perco tempo procurando textos em notas, conversas e documentos.`
   - `Reescrevo pequenas variacoes do mesmo texto todo dia.`
   - `Tenho prompts e snippets bons, mas eles ficam espalhados.`
   - `Uso sistemas diferentes e cada contexto pede uma resposta diferente.`

4. Bloco de ganho
   - `10 a 30 segundos economizados por reutilizacao.`
   - `1 a 2 horas por semana para usuarios que reutilizam 20 a 40 textos por dia.`
   - `Ate 30 minutos por dia em rotinas intensas de atendimento, suporte, juridico, CRM ou desenvolvimento.`

5. Planos
   - Essencial:
     - R$ 0.
     - Login Google.
     - Sync entre dispositivos.
     - Snippets e dominios liberados para uso individual razoavel.
     - Textos, prompts, comandos e snippets de codigo.
     - Sem IA.
     - CTA: `Comecar gratis`.
   - Fluxo:
     - R$ 24/mes como ancora inicial.
     - Bibliotecas por area.
     - Templates com variaveis.
     - Historico/versionamento.
     - Regras por dominio/URL.
     - Atalhos avancados.
     - Automacoes de fluxo.
     - Bot WhatsApp se o custo operacional fechar.
     - CTA: `Assinar Fluxo`.
   - Aceleracao:
     - R$ 59/mes como ancora inicial.
     - Slash commands com IA.
     - Transformacao de texto.
     - Comandos como `/followup`, `/checklist`, `/commit`, `/review`, `/prompt-refine`.
     - Workflows agenticos.
     - CTA: `Entrar na lista` ate a camada existir.
   - Operacao:
     - preco por usuario a definir.
     - Bibliotecas compartilhadas.
     - Modelos oficiais.
     - Permissoes.
     - Auditoria.
     - CTA: `Falar sobre time`.

6. Comparacao por estagio de produtividade
   - Essencial: `guardar, encontrar, sincronizar e reutilizar`.
   - Fluxo: `estruturar, adaptar, versionar e operar bibliotecas`.
   - Aceleracao: `transformar contexto em resposta, checklist ou workflow`.
   - Operacao: `padronizar bibliotecas, permissoes e modelos oficiais para times`.

7. Confianca
   - `O core e open-source.`
   - `Seus textos nao sao enviados para IA sem comando explicito.`
   - `Sync nao e consentimento para IA.`
   - `Voce pode exportar seus dados.`

8. FAQ
   - `O Essencial tem limite de snippets?`
     - `Nao como proposta comercial. O Essencial e liberado para uso individual razoavel; limites tecnicos existem apenas para antiabuso.`
   - `Por que pagar Fluxo?`
     - `Porque o Fluxo resolve organizacao avancada, templates, historico, bibliotecas e automacoes de fluxo.`
   - `O Copia e Cola envia meus textos para IA?`
     - `Nao. IA so roda quando voce aciona explicitamente um comando de IA.`
   - `Posso usar para codigo e prompts?`
     - `Sim. Esse e um caso de uso nativo.`

## Fluxo Stripe

### Inicio

1. Usuario clica em `Assinar Fluxo`.
2. Frontend chama o cloud privado:

```http
POST /billing/create-checkout-session
Authorization: Bearer <Firebase ID token>
Content-Type: application/json

{
  "plan": "fluxo",
  "billingCycle": "monthly"
}
```

3. Backend valida:
   - Firebase ID token;
   - usuario existente;
   - plano solicitado;
   - preco Stripe ativo;
   - antiabuso/rate limit.

4. Backend cria Stripe Checkout Session.
5. Backend retorna `checkoutUrl`.
6. Frontend redireciona para Stripe Checkout.

### Confirmacao

1. Stripe processa pagamento.
2. Stripe redireciona para `success_url`.
3. Frontend mostra estado `Pagamento confirmado`, mas ainda nao deve confiar apenas no redirect.
4. Stripe chama webhook privado.
5. Backend valida assinatura do webhook.
6. Backend atualiza o usuario:

```txt
users/{uid}
  plan: "pro"
  stripeCustomerId
  subscriptionId
  subscriptionStatus
  currentPeriodEnd
```

7. Extensao/app consulta sessao cloud e libera recursos Fluxo.

### Portal do cliente

Para gerenciar assinatura:

```http
POST /billing/create-customer-portal-session
Authorization: Bearer <Firebase ID token>
```

O backend cria uma Stripe Customer Portal Session e retorna a URL.

## Fora do repo publico

- chaves Stripe;
- price IDs reais;
- webhook secret;
- endpoints administrativos;
- regras privadas de antiabuso;
- codigo de billing real;
- dados de usuario.

## Referencias Stripe

- Stripe Checkout Session: https://docs.stripe.com/api/checkout/sessions/create
- Stripe Customer Portal Session: https://docs.stripe.com/api/customer_portal/sessions
- Stripe webhooks e verificacao de assinatura: https://docs.stripe.com/webhooks

## Consequencias

- A oferta publica continua boa para portfolio.
- O paywall real fica no servidor.
- A extensao pode mostrar telas e estados sem expor a operacao financeira.
- Essencial permanece forte; Fluxo vende ganho objetivo de produtividade estruturada.
