import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { buildExport, mergeImportedItems, parseImportPayload } from "../../src/lib/backup";
import { domainFromUrl } from "../../src/lib/domain";
import { designFixtureItems, useDesignFixture } from "../../src/fixtures/design";
import { suggestCommandTrigger } from "../../src/lib/slash-commands";
import * as storage from "../../src/lib/storage";
import type { ClipboardItem } from "../../src/types";
import {
  BackupPanel,
  Button,
  ClipboardItemCard,
  DeleteDialog,
  DomainHeader,
  EmptyState,
  Icon,
  IconButton,
  SearchField,
  SectionLabel,
  Toast
} from "../../src/components";
import "../../src/styles/popup.css";

type View = "list" | "settings";

function matchesQuery(item: ClipboardItem, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return `${item.title} ${item.content} ${item.domain || "global"}`.toLowerCase().includes(needle);
}

async function getActiveUrl() {
  const testActiveUrl = new URLSearchParams(window.location.search).get("activeUrl");
  if (testActiveUrl) return testActiveUrl;
  if (!globalThis.chrome?.tabs?.query) return window.location.href;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}

function App() {
  const [view, setView] = useState<View>("list");
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [query, setQuery] = useState("");
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [editing, setEditing] = useState<ClipboardItem | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [globalItem, setGlobalItem] = useState(false);
  const [commandEnabled, setCommandEnabled] = useState(false);
  const [commandTrigger, setCommandTrigger] = useState("");
  const [commandError, setCommandError] = useState("");
  const [toast, setToast] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ClipboardItem | null>(null);
  const [importSummary, setImportSummary] = useState("");
  const [booted, setBooted] = useState(false);

  async function refresh() {
    if (useDesignFixture()) {
      setItems(designFixtureItems());
      return;
    }

    setItems(await storage.readAll());
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  useEffect(() => {
    async function boot() {
      const activeUrl = await getActiveUrl();
      setCurrentDomain(useDesignFixture() ? "web.whatsapp.com" : domainFromUrl(activeUrl));
      await refresh();
      setBooted(true);
    }

    boot().catch((error) => showToast(error?.message || "Erro ao abrir."));
  }, []);

  const domainTotal = items.filter((item) => item.scope === "domain" && item.domain === currentDomain).length;
  const domainItems = useMemo(
    () => items.filter((item) => item.scope === "domain" && item.domain === currentDomain && matchesQuery(item, query)),
    [items, currentDomain, query]
  );
  const globalItems = useMemo(
    () => items.filter((item) => item.scope === "global" && matchesQuery(item, query)),
    [items, query]
  );
  const hasResults = domainItems.length > 0 || globalItems.length > 0;

  function openComposer(item?: ClipboardItem) {
    setEditing(item || null);
    setTitle(item?.title || "");
    setContent(item?.content || "");
    setGlobalItem(item?.scope === "global");
    setCommandEnabled(Boolean(item?.commandEnabled));
    setCommandTrigger(item?.commandTrigger || "");
    setCommandError("");
    setComposerOpen(true);
  }

  function closeComposer() {
    setEditing(null);
    setTitle("");
    setContent("");
    setGlobalItem(false);
    setCommandEnabled(false);
    setCommandTrigger("");
    setCommandError("");
    setComposerOpen(false);
  }

  function toggleCommandMode(checked: boolean) {
    setCommandEnabled(checked);
    setCommandError("");
    if (checked && !commandTrigger.trim()) {
      setCommandTrigger(suggestCommandTrigger(title || storage.makeTitle(content)));
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!content.trim()) {
      showToast("Conteúdo obrigatório.");
      return;
    }

    const scope = globalItem ? "global" : "domain";
    try {
      await storage.upsertItem({
        id: editing?.id,
        scope,
        domain: scope === "domain" ? currentDomain : null,
        title,
        content,
        commandEnabled,
        commandTrigger: commandEnabled ? commandTrigger : null
      });
      closeComposer();
      await refresh();
      showToast(editing ? "Alterações salvas." : "Item salvo.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel salvar.";
      setCommandError(message);
      showToast(message);
    }
  }

  async function copyItem(item: ClipboardItem) {
    await navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    await storage.markCopied(item.id);
    await refresh();
    showToast("Copiado para a área de transferência.");
    window.setTimeout(() => setCopiedId(null), 1300);
  }

  async function toggleFavorite(id: string) {
    const changed = await storage.toggleFavorite(id);
    await refresh();
    showToast(changed?.favorite ? "Item fixado." : "Item desafixado.");
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await storage.deleteItem(pendingDelete.id);
    setPendingDelete(null);
    await refresh();
    showToast("Item excluído.");
  }

  async function exportJson() {
    const payload = buildExport(await storage.readAll());
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `copia-e-cola-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Backup exportado.");
  }

  async function importJson(file: File | undefined) {
    if (!file) return;
    try {
      const importedItems = parseImportPayload(await file.text(), storage.normalizeItem);
      const result = mergeImportedItems(await storage.readAll(), importedItems);
      await storage.writeAll(result.items);
      await refresh();
      const message = `${result.imported} itens importados. ${result.skipped} duplicados ignorados.`;
      setImportSummary(message);
      showToast(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível importar.";
      setImportSummary(message);
      showToast(message);
    }
  }

  const headerDomain = booted ? currentDomain : "Carregando";

  return (
    <main className="popup-shell">
      {view === "settings" ? (
        <section id="settings-view" className="settings-view">
          <header className="settings-header">
            <IconButton id="back-to-list-button" icon="arrow-left" label="Voltar" onClick={() => setView("list")} />
            <div><p className="eyebrow">Local-first</p><h2>Configurações</h2></div>
          </header>
          <BackupPanel total={items.length} importSummary={importSummary} onExport={exportJson} onImport={importJson} />
        </section>
      ) : (
        <section id="list-view" className="view">
          <DomainHeader domain={headerDomain} count={currentDomain ? domainTotal : undefined} onSettings={() => setView("settings")} />
          {!currentDomain && booted ? (
            <section id="unsupported-state" className="notice notice--warning">
              <strong>Página não suportada</strong>
              <span>Abra a extensão em um site comum para salvar itens por domínio.</span>
            </section>
          ) : null}
          {currentDomain ? (
            <section id="app-content" className="app-content">
              <div className="top-stack">
                <SearchField value={query} placeholder="Buscar por título ou conteúdo" onChange={setQuery} onClear={() => setQuery("")} />
                {!isComposerOpen ? (
                  <button id="open-composer-button" className="composer-trigger" type="button" onClick={() => openComposer()}>
                    <Icon name="plus" size={16} />
                    Novo item para este site
                  </button>
                ) : (
                  <form id="item-form" className="composer" onSubmit={submit}>
                    <input id="editing-id" type="hidden" value={editing?.id || ""} readOnly />
                    <label className="field"><span>Título</span><input id="title-input" value={title} maxLength={80} placeholder="Opcional, gerado do conteúdo" onChange={(event) => setTitle(event.currentTarget.value)} /></label>
                    <label className="field"><span>Conteúdo</span><textarea id="content-input" value={content} rows={4} maxLength={8000} required placeholder="Cole aqui o texto que você reutiliza" onChange={(event) => setContent(event.currentTarget.value)} /></label>
                    <label className="checkbox-row"><input id="global-input" type="checkbox" checked={globalItem} onChange={(event) => setGlobalItem(event.currentTarget.checked)} /><span>Disponível em todos os sites</span></label>
                    <label className="checkbox-row command-toggle">
                      <input id="command-enabled-input" type="checkbox" checked={commandEnabled} onChange={(event) => toggleCommandMode(event.currentTarget.checked)} />
                      <span>Usar como comando</span>
                      <span className="command-help" tabIndex={0}>?
                        <span className="command-tooltip">Quando você digitar este comando em um campo de texto, ele será trocado pelo conteúdo salvo.</span>
                      </span>
                    </label>
                    {commandEnabled ? (
                      <label className="field">
                        <span>Comando</span>
                        <input id="command-trigger-input" value={commandTrigger} maxLength={60} placeholder="/meu-comando" onChange={(event) => {
                          setCommandTrigger(event.currentTarget.value);
                          setCommandError("");
                        }} />
                        {commandError ? <small className="field-error">{commandError}</small> : null}
                      </label>
                    ) : null}
                    <div className="composer__actions">
                      <Button id="save-button" variant="primary" type="submit" icon="check" fullWidth>{editing ? "Salvar alterações" : "Salvar"}</Button>
                      <Button id="cancel-edit-button" variant="ghost" onClick={closeComposer}>Cancelar</Button>
                    </div>
                  </form>
                )}
              </div>
              <div id="results-state" className="results-state">
                {!hasResults ? (
                  <section className="list-section list-section--empty">
                    {query.trim()
                      ? <EmptyState icon="search" title="Nenhum item encontrado" body={`Nada corresponde a "${query.trim()}".`} />
                      : <EmptyState title="Nenhum item salvo para este site ainda" body="Cole um texto, dê um título opcional e salve para reutilizar aqui." action={<Button size="sm" icon="plus" onClick={() => openComposer()}>Salvar primeiro item</Button>} />}
                  </section>
                ) : (
                  <>
                    <section className="list-section">
                      <SectionLabel count={domainItems.length}>Itens deste site</SectionLabel>
                      <div id="domain-list" className="item-list">
                        {domainItems.length === 0
                          ? <EmptyState title={`Nenhum item para ${currentDomain}.`} />
                          : domainItems.map((item) => <ClipboardItemCard key={item.id} item={item} copied={copiedId === item.id} onCopy={copyItem} onFavorite={toggleFavorite} onEdit={openComposer} onDelete={setPendingDelete} />)}
                      </div>
                    </section>
                    {globalItems.length ? (
                      <section id="global-section" className="list-section">
                        <SectionLabel count={globalItems.length}>Itens globais</SectionLabel>
                        <div id="global-list" className="item-list">{globalItems.map((item) => <ClipboardItemCard key={item.id} item={item} copied={copiedId === item.id} onCopy={copyItem} onFavorite={toggleFavorite} onEdit={openComposer} onDelete={setPendingDelete} />)}</div>
                      </section>
                    ) : null}
                  </>
                )}
              </div>
            </section>
          ) : null}
          <footer className="popup-footer">
            <Icon name="lock" size={13} />
            <span>Salvo localmente neste navegador</span>
            <button id="backup-toggle" type="button" onClick={() => setView("settings")}>Backup</button>
          </footer>
        </section>
      )}
      <DeleteDialog item={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={confirmDelete} />
      <Toast message={toast} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
