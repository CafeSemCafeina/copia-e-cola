# Checklist de validação local

Use a pasta `extension/` como extensão sem compactação no Chrome ou Edge.

## Instalação

1. Abrir `chrome://extensions` ou `edge://extensions`.
2. Ativar modo desenvolvedor.
3. Clicar em "Carregar sem compactação".
4. Selecionar a pasta `extension/`.
5. Abrir a extensão em um site comum.

## Fluxos manuais

- Em `https://web.whatsapp.com`, confirmar que o topo exibe `web.whatsapp.com`.
- Salvar um item com título opcional e conteúdo obrigatório.
- Copiar o item e colar em um campo de texto, confirmando conteúdo exato.
- Editar título/conteúdo e confirmar atualização imediata.
- Excluir o item e confirmar que apenas ele saiu da lista.
- Salvar um item em um portal jurídico e confirmar que ele não aparece no WhatsApp.
- Salvar um item em uma ferramenta Syntelix e confirmar isolamento por domínio.
- Criar um item global e confirmar que aparece nos domínios suportados.
- Exportar JSON.
- Importar o JSON em um perfil limpo ou após limpar o storage da extensão.
- Tentar importar JSON inválido e confirmar mensagem de erro sem apagar dados atuais.

## Validação automatizada local

```powershell
npm run check
npm run chrome:smoke
```

O smoke automatizado valida a extensão em um perfil temporário de navegador Chromium/Chrome real quando o binário local permite `--load-extension`.

## Limitações conhecidas

- O MVP usa domínio como contexto; caminhos específicos ainda não são separados.
- Backup é JSON local, sem criptografia e sem nuvem.
- Não há sincronização entre navegadores ou máquinas.
- Páginas internas do navegador, arquivos locais e `about:blank` não são suportados.
- A validação real em Chrome/Edge ainda é manual.
