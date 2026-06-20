/* Copia e Cola — extension popup (interactive recreation)
   Composes the design-system primitives from the global namespace. */
const DS = window.CopiaEColaDesignSystem_b68b1c;
const { DomainHeader, ClipboardItem, SearchInput, Input, Textarea, Button, IconButton, EmptyState, Toast, Badge, Icon } = DS;

const SEED = [
  { id: 'd1', scope: 'domain', title: 'Saudação inicial', favorite: true,
    content: 'Olá! Tudo bem? Sou da equipe e já vou te ajudar por aqui. Pode me contar o que você precisa?',
    meta: 'Copiado há 2 dias' },
  { id: 'd2', scope: 'domain', title: 'Pedido de documentos', favorite: false,
    content: 'Para dar andamento, preciso de: RG, CPF e comprovante de residência atualizado. Pode enviar por aqui mesmo.',
    meta: 'Copiado há 5 dias' },
  { id: 'd3', scope: 'domain', title: 'Encerramento do atendimento', favorite: false,
    content: 'Fico à disposição! Qualquer dúvida, é só chamar por aqui. Tenha um ótimo dia.',
    meta: 'Criado há 1 semana' },
  { id: 'g1', scope: 'global', title: 'Pedido de protocolo', favorite: false,
    content: 'Por gentileza, me informe o número de protocolo para que eu localize seu atendimento.',
    meta: 'Copiado há 1 semana' },
  { id: 'g2', scope: 'global', title: 'Dados bancários — PIX', favorite: true,
    content: 'Chave PIX (CNPJ): 12.345.678/0001-90 — Banco 077. Confirme o envio para liberar o serviço.',
    meta: 'Copiado ontem' },
];

function uid() { return 'i' + Math.random().toString(36).slice(2, 8); }

function SectionLabel({ children, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px 2px' }}>
      <span style={{ font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-ui)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{children}</span>
      {typeof count === 'number' && (
        <span style={{ font: 'var(--type-meta)', color: 'var(--text-muted)' }}>{count}</span>
      )}
    </div>
  );
}

function Composer({ open, draft, onOpen, onChange, onSave, onCancel }) {
  if (!open) {
    return (
      <button type="button" onClick={onOpen}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%',
          height: 36, border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)',
          background: 'var(--surface-card)', color: 'var(--text-brand)', cursor: 'pointer',
          font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-ui)' }}>
        <Icon name="plus" size={16} /> Novo item para este site
      </button>
    );
  }
  const valid = draft.content.trim().length > 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)' }}>
      <Input label="Título (opcional)" value={draft.title} placeholder="Gerado do conteúdo se vazio"
        onChange={e => onChange({ ...draft, title: e.target.value })} />
      <Textarea label="Conteúdo" value={draft.content} rows={3} placeholder="Cole aqui o texto que você reutiliza"
        onChange={e => onChange({ ...draft, content: e.target.value })} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button variant="primary" icon="check" disabled={!valid} onClick={onSave} style={{ flex: 1 }}>
          {draft.id ? 'Salvar alterações' : 'Salvar'}
        </Button>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
}

function Settings({ count, onBack, toast }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid var(--border-hairline)' }}>
        <IconButton icon="arrow-left" label="Voltar" onClick={onBack} />
        <span style={{ font: 'var(--type-heading)', color: 'var(--text-strong)' }}>Configurações</span>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
          <Icon name="shield-check" size={20} style={{ color: 'var(--text-brand)', flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-ui)', color: 'var(--green-900)' }}>Seus dados ficam neste navegador</p>
            <p style={{ margin: '3px 0 0', font: 'var(--fw-regular) var(--text-xs)/1.45 var(--font-ui)', color: 'var(--text-brand)' }}>Local-first por padrão. Nada é enviado para servidores.</p>
          </div>
        </div>
        <div>
          <SectionLabel>Backup</SectionLabel>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <Button variant="secondary" icon="download" onClick={() => toast('success', 'download', 'Backup exportado (JSON)')} style={{ flex: 1 }}>Exportar JSON</Button>
            <Button variant="secondary" icon="upload" onClick={() => toast('success', 'upload', 'Itens importados')} style={{ flex: 1 }}>Importar JSON</Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, borderTop: '1px solid var(--border-hairline)' }}>
          <span style={{ font: 'var(--type-meta)', color: 'var(--text-muted)' }}>{count} itens salvos</span>
          <span style={{ font: 'var(--type-meta)', color: 'var(--text-muted)' }}>v0.1.0</span>
        </div>
      </div>
    </div>
  );
}

function PopupApp({ domain = 'web.whatsapp.com' }) {
  const [items, setItems] = React.useState(SEED);
  const [query, setQuery] = React.useState('');
  const [composer, setComposer] = React.useState(false);
  const [draft, setDraft] = React.useState({ title: '', content: '' });
  const [view, setView] = React.useState('list'); // 'list' | 'settings'
  const [copiedId, setCopiedId] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const flash = (tone, icon, msg) => { setToast({ tone, icon, msg, k: Date.now() }); setTimeout(() => setToast(t => (t && t.k ? null : t)), 1700); };

  const q = query.trim().toLowerCase();
  const match = (it) => !q || it.title.toLowerCase().includes(q) || it.content.toLowerCase().includes(q);
  const domainItems = items.filter(i => i.scope === 'domain' && match(i));
  const globalItems = items.filter(i => i.scope === 'global' && match(i));

  const openNew = () => { setDraft({ title: '', content: '' }); setComposer(true); };
  const saveDraft = () => {
    const title = draft.title.trim() || draft.content.trim().split('\n')[0].slice(0, 32);
    if (draft.id) {
      setItems(items.map(i => i.id === draft.id ? { ...i, title, content: draft.content } : i));
      flash('neutral', 'check', 'Alterações salvas');
    } else {
      setItems([{ id: uid(), scope: 'domain', title, content: draft.content, favorite: false, meta: 'Agora mesmo' }, ...items]);
      flash('success', 'check-circle', 'Item salvo');
    }
    setComposer(false); setDraft({ title: '', content: '' });
  };
  const editItem = (it) => { setDraft({ id: it.id, title: it.title, content: it.content }); setComposer(true); };
  const delItem = (id) => { setItems(items.filter(i => i.id !== id)); flash('danger', 'trash', 'Item excluído'); };
  const copyItem = (it) => { setCopiedId(it.id); flash('success', 'copy', 'Copiado para a área de transferência'); setTimeout(() => setCopiedId(c => c === it.id ? null : c), 1300); };
  const toggleFav = (id) => setItems(items.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i));

  const renderItem = (it) => (
    <ClipboardItem key={it.id} title={it.title} content={it.content} scope={it.scope}
      favorite={it.favorite} meta={it.meta} copied={copiedId === it.id}
      onCopy={() => copyItem(it)} onEdit={() => editItem(it)} onDelete={() => delItem(it.id)}
      onToggleFavorite={() => toggleFav(it.id)} />
  );

  return (
    <div style={{ position: 'relative', width: 'var(--popup-width)', maxHeight: 580, display: 'flex', flexDirection: 'column',
      background: 'var(--surface-canvas)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-hairline)' }}>

      {view === 'settings'
        ? <Settings count={items.length} onBack={() => setView('list')} toast={flash} />
        : <>
          <DomainHeader domain={domain} count={items.filter(i => i.scope === 'domain').length} onSettings={() => setView('settings')} />

          <div style={{ padding: '12px 12px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SearchInput value={query} onChange={e => setQuery(e.target.value)} onClear={() => setQuery('')} placeholder="Buscar por título ou conteúdo" />
            <Composer open={composer} draft={draft} onOpen={openNew}
              onChange={setDraft} onSave={saveDraft} onCancel={() => { setComposer(false); setDraft({ title: '', content: '' }); }} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {domainItems.length === 0 && globalItems.length === 0 ? (
              q
                ? <EmptyState icon="search" title="Nenhum item encontrado" description={'Nada corresponde a "' + query + '".'} />
                : <EmptyState title="Nenhum item salvo para este site ainda" description="Cole um texto, dê um título opcional e salve para reutilizar aqui." action={<Button size="sm" icon="plus" onClick={openNew}>Salvar primeiro item</Button>} />
            ) : (
              <>
                <SectionLabel count={domainItems.length}>Itens deste site</SectionLabel>
                {domainItems.length > 0
                  ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{domainItems.map(renderItem)}</div>
                  : <p style={{ margin: '0 2px 4px', font: 'var(--type-body)', color: 'var(--text-muted)' }}>Nenhum item para {domain}.</p>}

                {globalItems.length > 0 && <>
                  <SectionLabel count={globalItems.length}>Itens globais</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{globalItems.map(renderItem)}</div>
                </>}
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}>
            <Icon name="lock" size={13} style={{ color: 'var(--text-muted)' }} />
            <span style={{ font: 'var(--type-meta)', color: 'var(--text-muted)', flex: 1 }}>Salvo localmente neste navegador</span>
            <button type="button" onClick={() => setView('settings')} style={{ border: 'none', background: 'transparent', color: 'var(--text-brand)', font: 'var(--fw-semibold) var(--text-2xs)/1 var(--font-ui)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)', cursor: 'pointer' }}>Backup</button>
          </div>
        </>}

      {toast && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <Toast tone={toast.tone} icon={toast.icon}>{toast.msg}</Toast>
        </div>
      )}
    </div>
  );
}

window.PopupApp = PopupApp;
