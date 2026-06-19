# Copia e Cola

Copia e Cola é um micro SaaS open-source e local-first para guardar textos, prompts, protocolos e modelos de resposta por contexto de uso no navegador.

A ideia inicial é simples: ao abrir um site, o usuário vê apenas os itens salvos para aquele domínio. Assim, conteúdos usados no WhatsApp Web, em tribunais, CRMs, portais públicos ou ferramentas internas não ficam misturados em uma biblioteca genérica.

## Objetivo do MVP

Validar se um clipboard contextual por site reduz retrabalho em operações brasileiras que vivem copiando e colando pequenos textos entre páginas.

O primeiro recorte deve ser uma extensão de navegador com:

- salvamento local de itens por domínio;
- título opcional;
- lista de itens do site atual;
- copiar com um clique;
- editar e excluir itens;
- exportação e importação local em JSON.

## Princípios

- Local-first: o conteúdo do usuário fica no navegador por padrão.
- Open-source: o núcleo deve ser auditável e gratuito.
- Simples antes de inteligente: o MVP deve resolver cópia e cola antes de IA, sync ou colaboração.
- Brasil primeiro: jurídico, WhatsApp, portais públicos, CRMs e sistemas legados são contextos de produto relevantes.

## Status

Projeto em bootstrap inicial.

## Roadmap curto

1. Definir PRD mínimo e critérios de aceite.
2. Implementar extensão Manifest V3.
3. Validar uso local em 3 contextos: WhatsApp Web, um portal jurídico e uma ferramenta Syntelix.
4. Decidir o corte entre gratuito, Plus e licença vitalícia local.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).
