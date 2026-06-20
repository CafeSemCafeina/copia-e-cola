# Spec 007 - Empacotamento e validação

Status: Done

## Objetivo

Preparar uma versão local do MVP para uso interno e teste com poucos usuários.

## Escopo

- Checklist de validação manual.
- Build ou pacote carregável localmente.
- README atualizado com instalação e uso.
- Registro de limitações conhecidas.
- Tag ou versão local `0.1.0` quando o MVP estiver funcional.

## Fora de escopo

- Publicação na Chrome Web Store.
- Cobrança.
- Política de privacidade pública completa.
- Suporte multi-browser formal.

## Critérios de aceite

- Repositório limpo após build.
- Extensão instalada localmente em Chrome ou Edge.
- Fluxos validados:
  - salvar item em `web.whatsapp.com`;
  - salvar item em um portal jurídico;
  - salvar item em uma ferramenta Syntelix;
  - confirmar que os itens não se misturam;
  - exportar JSON;
  - importar JSON em perfil limpo ou ambiente de teste.
- Limitações conhecidas documentadas.

## Próximo corte

Depois da validação local, decidir se o próximo ciclo será:

- polimento do produto local;
- publicação pública;
- recurso pago local;
- integração com camada Syntelix/Fidelia.
