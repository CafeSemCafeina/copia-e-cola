# Spec 014 - Migração para React/WXT

Status: Done

Nota pós-implementação: a migração foi concluída e a pasta legada `extension/` foi removida. A fonte publicável atual fica em `entrypoints/`, `src/` e `public/`.

## Objetivo

Migrar a extensão de HTML/CSS/JS vanilla para uma base React empacotada para Manifest V3, preservando todos os fluxos já validados e criando uma base mais sustentável para atingir paridade visual exata com o Claude Design.

## Decisão Recomendada

Usar React com WXT como framework de extensão.

Motivos:

- WXT já modela extensões como entrypoints (`popup`, `options`, `background`, páginas internas) em vez de exigir configuração manual de múltiplos bundles.
- Mantém build compatível com Manifest V3, empacotando todo o JavaScript dentro da extensão.
- Suporta React sem obrigar a adotar um runtime pesado de app web tradicional.
- Facilita evolução para testes visuais e build de publicação.
- É mais adequado que copiar o runtime do Claude Design para produção.

Alternativas consideradas:

- `React + Vite + @crxjs/vite-plugin`: viável, mais controle, mas mais configuração manual.
- `Plasmo`: bom para React e DX, mas mais opinativo e pode impor estrutura menos transparente.
- Manter vanilla: menor risco imediato, mas a paridade pixel-perfect fica mais cara e manual.
- Usar diretamente o HTML exportado do Claude Design: aproxima visualmente no curto prazo, mas cria dependência frágil de runtime de design e dificulta manter Manifest V3 publicável.

## Contexto Técnico

Manifest V3 não permite depender de JavaScript remoto executável. A migração para React deve gerar HTML/CSS/JS estáticos empacotados dentro da extensão.

O React deve ser usado apenas como runtime local da UI:

- popup abre HTML compilado e inicializa React;
- options abre HTML compilado e inicializa React;
- welcome abre HTML compilado e inicializa React;
- background continua sendo service worker sem React;
- storage, backup e domínio devem permanecer como lógica local testável.

## Escopo

### Estrutura de Projeto

- Adicionar dependências:
  - `react`;
  - `react-dom`;
  - `typescript`;
  - `wxt`;
  - dependências de teste/build necessárias.
- Criar estrutura WXT:
  - `entrypoints/popup/`;
  - `entrypoints/options/`;
  - `entrypoints/welcome/`;
  - `entrypoints/background.ts`;
  - `src/lib/`;
  - `src/components/`;
  - `src/styles/`;
  - `public/` ou pasta equivalente para ícones/assets estáticos.
- Configurar Manifest V3 pelo WXT preservando:
  - `name`;
  - `description`;
  - `version`;
  - `permissions: ["activeTab", "storage"]`;
  - `action.default_popup`;
  - `options_page`;
  - `background.service_worker`;
  - ícones.
- Definir saída de build em `dist/`.

### Migração de Lógica

- Migrar a lógica de domínio para `src/lib/domain.ts`.
- Migrar a lógica de storage para `src/lib/storage.ts`.
- Migrar a lógica de backup para `src/lib/backup.ts`.
- Preservar schema atual:
  - `STORAGE_KEY = "copiaEColaItems"`;
  - `SCHEMA_VERSION = 1`;
  - campo `favorite` mantido como compatibilidade interna;
  - linguagem visual continua `Fixar` / `Desafixar`.
- Manter compatibilidade com dados já salvos no navegador.
- Preservar export/import JSON atual.

### Componentes React

Criar componentes reutilizáveis alinhados ao Claude Design:

- `BrandMark`;
- `DomainHeader`;
- `SearchField`;
- `Composer`;
- `ClipboardItemCard`;
- `EmptyState`;
- `Toast`;
- `DeleteDialog`;
- `BackupPanel`;
- `StatsPanel`;
- `FilterBar`;
- `PageShell`;

Os componentes devem nascer a partir do comportamento real, não copiando cegamente o HTML exportado.

### Popup

Recriar em React todos os estados da spec `009`:

- lista padrão;
- primeiro uso vazio;
- novo item;
- edição;
- busca com resultado;
- busca sem resultado;
- configurações/backup;
- copiado com toast;
- confirmação de exclusão;
- importação com resumo.

O popup deve continuar com largura de 360 px e densidade visual alinhada ao Claude Design.

### Welcome

Recriar a página de boas-vindas da spec `010` em React:

- `Tudo pronto para copiar menos e colar melhor`;
- 3 passos;
- card local-first;
- CTA `Começar a salvar`;
- CTA para options quando aplicável.

### Options

Recriar a página de opções em React:

- busca global;
- filtros `Todos`, `Fixados`, `Globais` e domínios;
- grupos por domínio/global;
- resumo lateral;
- copiar, editar, fixar/desafixar, excluir;
- export/import.

### Store e Landing

- Manter `store/` como artefato versionado independente do build da extensão.
- Decidir se a landing permanece estática em `site/` ou passa para React apenas se houver ganho real.
- A landing não deve bloquear a migração da extensão.

### Validação Visual

- Criar fixtures de estado para renderizar popup React com dados determinísticos.
- Capturar referência do Claude Design a partir de `design-system/screens/telas-da-extensao.html`.
- Capturar implementação React.
- Gerar comparação lado a lado em `output/playwright/`.
- Opcionalmente adicionar threshold automatizado de diferença visual depois que as telas estiverem estáveis.

## Plano de Migração

1. Congelar baseline atual.
   - Rodar `npm run check`.
   - Rodar `npm run chrome:smoke`.
   - Rodar `npm run visual:snapshots`.
   - Guardar screenshots locais em `output/playwright/` para comparação manual.

2. Introduzir WXT/React sem trocar o runtime publicado ainda.
   - Criar estrutura `entrypoints/` e `src/`.
   - Configurar build para gerar `dist/`.
   - Durante a migração, manter o legado intacto até o build React reproduzir os fluxos principais.

3. Migrar bibliotecas puras.
   - Portar `domain`, `storage` e `backup` para TypeScript.
   - Adaptar testes unitários para usar a nova fonte.
   - Manter compatibilidade temporária ou remover os JS antigos somente após os testes passarem.

4. Migrar popup.
   - Implementar componentes React.
   - Reproduzir estados da spec `009`.
   - Atualizar smoke para abrir o popup gerado pelo build React.

5. Migrar welcome e options.
   - Implementar páginas internas em React.
   - Validar rotas e manifest gerado.
   - Preservar todos os comportamentos da spec `010`.

6. Trocar fonte de publicação.
   - Fazer `npm run build` gerar o pacote publicável.
   - Atualizar scripts de validação para validar `dist/` como extensão final.
   - Remover o legado quando o build React estiver validado.

7. Refinar pixel-perfect.
   - Ajustar tokens, espaçamentos, ícones e estados contra o Claude Design.
   - Atualizar `visual:snapshots` para usar build React.
   - Registrar divergências técnicas inevitáveis.

8. Atualizar docs.
   - README;
   - checklist de validação;
   - instruções de build/publicação;
   - decisão sobre ícones e assets.

## Fora de Escopo

- Publicação real na Chrome Web Store.
- Sync em nuvem.
- Login.
- IA ou sugestões automáticas.
- Trocar schema de storage para algo incompatível.
- Migrar a landing para SPA sem necessidade concreta.
- Usar código remoto ou CDN para React.

## Critérios de Aceite

- `npm run check` passa.
- `npm run chrome:smoke` passa usando a extensão React buildada.
- `npm run build` gera uma extensão Manifest V3 carregável no Chrome/Edge.
- O pacote final não carrega JavaScript remoto.
- As permissões continuam mínimas: `activeTab` e `storage`.
- Dados salvos antes da migração continuam legíveis.
- Export/import JSON mantém o formato atual.
- Popup, welcome e options têm paridade funcional com as specs `009` e `010`.
- Store assets e landing continuam válidos.
- Existe comando documentado para snapshots visuais da versão React.
- A comparação visual mostra que a versão React está mais próxima do Claude Design do que a versão vanilla anterior, ou registra claramente as divergências restantes.

## Riscos

- A migração pode quebrar o smoke de extensão se o manifest gerado não preservar caminhos e permissões.
- O bundle React pode aumentar o peso do popup; deve ser medido antes de publicar.
- HMR/dev server não representa o ambiente da Chrome Web Store; a validação precisa rodar sempre contra build estático.
- Copiar o design exportado diretamente pode criar acoplamento ruim; a migração deve portar componentes e tokens, não o runtime de design.
- Se a base atual não for congelada antes, fica difícil distinguir regressão funcional de diferença visual.

## Evidências Esperadas

- `package.json` com scripts de build, dev, check, smoke e snapshots.
- `wxt.config.*` ou configuração equivalente.
- `entrypoints/` com popup, options, welcome e background.
- `src/lib/` com lógica migrada e testada.
- `dist/` gerado localmente e ignorado pelo Git se for build.
- Screenshots em `output/playwright/` mostrando referência vs React.
- README e checklist atualizados.
