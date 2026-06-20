# Spec 012 - Landing page pública

Status: Done

## Objetivo

Criar uma landing page simples, publicável e coerente com o modelo visual e de produto definido no Claude Design.

## Escopo

- Criar uma página estática em `site/` ou `landing/`, escolhendo uma pasta única antes da implementação.
- Usar HTML/CSS/JS simples, sem framework, salvo decisão explícita posterior.
- Reusar tokens visuais do design system quando possível.
- Apresentar o produto com a mesma promessa:
  - clipboard por site;
  - local-first;
  - open-source;
  - simples antes de inteligente.
- Incluir seções:
  - hero com nome `Copia e Cola`;
  - subtítulo operacional;
  - imagem ou composição real da extensão;
  - como funciona em 3 passos;
  - casos de uso: WhatsApp Web, portal jurídico, CRM/ferramenta interna;
  - privacidade/local-first;
  - CTA de instalação ou lista de espera;
  - link para GitHub quando existir URL pública;
  - FAQ curta;
  - rodapé com licença e privacidade.
- Preparar assets usados pela página em pasta própria.

## Conteúdo sugerido

- H1: `Copia e Cola`.
- Subtítulo: `Salve textos que você repete e cole de volta com um clique, organizados pelo site em que você está.`
- CTA primário antes da publicação: `Instalar localmente`.
- CTA primário depois da publicação: `Adicionar ao Chrome`.
- CTA secundário: `Ver código no GitHub`.

## Botões e comportamentos necessários

- `Adicionar ao Chrome`: abre URL da Chrome Web Store quando disponível; antes disso, pode apontar para instrução local ou ficar desabilitado com texto claro.
- `Instalar localmente`: leva para seção com instruções ou README.
- `Ver código no GitHub`: abre repositório público quando definido.
- `Baixar backup`: não deve existir na landing; backup é funcionalidade interna da extensão.
- `Privacidade`: abre seção ou arquivo de política de privacidade.

## Fora de escopo

- Blog.
- Autenticação.
- Analytics de terceiros antes de decisão explícita.
- Formulário com backend.
- Checkout ou plano pago.

## Critérios de aceite

- A primeira dobra mostra claramente o produto e uma imagem/preview real da extensão.
- A página é responsiva em desktop e mobile.
- Não há promessas de sync, IA, nuvem ou colaboração.
- O texto está alinhado à ficha da Chrome Web Store.
- A página não carrega recursos remotos desnecessários.
- O CTA não aponta para URL inexistente sem fallback claro.
- A landing pode ser aberta localmente por arquivo ou servidor estático simples.

## Referência visual

Usar o mesmo vocabulário visual dos screenshots, promo tile e marquee definidos na spec `011`, mantendo a página sóbria, operacional e local-first.
