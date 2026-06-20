import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { buildExport, mergeImportedItems, parseImportPayload } from "../../src/lib/backup";
import { designFixtureItems, useDesignFixture } from "../../src/fixtures/design";
import * as storage from "../../src/lib/storage";
import type { ClipboardItem } from "../../src/types";
import {
  Badge,
  BrandMark,
  Button,
  ClipboardItemCard,
  FilterBar,
  Icon,
  SearchField,
  SectionLabel
} from "../../src/components";
import "../../src/styles/options.css";

function matchesQuery(item: ClipboardItem, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return `${item.title} ${item.content} ${item.domain || "global"}`.toLowerCase().includes(needle);
}

function App() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<ClipboardItem | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [globalItem, setGlobalItem] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function refresh() {
    if (useDesignFixture()) {
      setItems(designFixtureItems());
      return;
    }

    setItems(await storage.readAll());
  }

  useEffect(() => {
    refresh();
  }, []);

  const domains = useMemo(
    () => [...new Set(items.filter((item) => item.scope === "domain").map((item) => item.domain || ""))].filter(Boolean),
    [items]
  );

  const filters: [string, string][] = [
    ["all", "Todos"],
    ["fixed", "Fixados"],
    ["global", "Globais"],
    ...domains.map((domain) => [domain, domain] as [string, string])
  ];

  const filteredItems = items.filter((item) => matchesQuery(item, query) && (
    activeFilter === "all" ||
    (activeFilter === "fixed" && item.favorite) ||
    (activeFilter === "global" && item.scope === "global") ||
    (item.scope === "domain" && item.domain === activeFilter)
  ));

  const grouped = filteredItems.reduce<Map<string, ClipboardItem[]>>((acc, item) => {
    const key = item.scope === "global" ? "Itens globais" : item.domain || "";
    acc.set(key, [...(acc.get(key) || []), item]);
    return acc;
  }, new Map());

  function openEditor(item: ClipboardItem) {
    setEditing(item);
    setTitle(item.title);
    setContent(item.content);
    setGlobalItem(item.scope === "global");
  }

  function closeEditor() {
    setEditing(null);
    setTitle("");
    setContent("");
    setGlobalItem(false);
  }

  async function submitEditor(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;

    const scope = globalItem ? "global" : "domain";
    await storage.upsertItem({
      id: editing.id,
      scope,
      domain: scope === "domain" ? editing.domain : null,
      title,
      content
    });
    closeEditor();
    await refresh();
    setStatus("Alterações salvas.");
  }

  async function copyItem(item: ClipboardItem) {
    await navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    await storage.markCopied(item.id);
    await refresh();
    setStatus("Copiado para a área de transferência.");
    window.setTimeout(() => setCopiedId(null), 1300);
  }

  async function toggleFavorite(id: string) {
    const changed = await storage.toggleFavorite(id);
    await refresh();
    setStatus(changed?.favorite ? "Item fixado." : "Item desafixado.");
  }

  async function deleteItem(item: ClipboardItem) {
    if (!window.confirm(`Excluir "${item.title}"?`)) return;
    await storage.deleteItem(item.id);
    await refresh();
    setStatus("Item excluído.");
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
    setStatus("Backup exportado.");
  }

  async function importJson(file: File | undefined) {
    if (!file) return;
    try {
      const importedItems = parseImportPayload(await file.text(), storage.normalizeItem);
      const result = mergeImportedItems(await storage.readAll(), importedItems);
      await storage.writeAll(result.items);
      await refresh();
      setStatus(`${result.imported} itens importados. ${result.skipped} duplicados ignorados.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível importar.");
    }
  }

  return (
    <main className="options-shell">
      <header className="options-topbar">
        <div className="brand-lockup">
          <BrandMark />
          <h1>Copia e <span>Cola</span></h1>
        </div>
        <div className="options-spacer" />
        <div className="options-search">
          <SearchField id="search-input" value={query} placeholder="Buscar em todos os itens" onChange={setQuery} onClear={() => setQuery("")} />
        </div>
        <Button id="export-button" variant="secondary" icon="download" onClick={exportJson}>Exportar</Button>
        <label className="button button--secondary button--md file-button">
          <Icon name="upload" size={17} />
          Importar
          <input id="import-input" type="file" accept="application/json,.json" onChange={(event) => importJson(event.currentTarget.files?.[0])} />
        </label>
      </header>

      <div className="options-body">
        <section className="options-main">
          <div className="options-title">
            <h2>Seus itens</h2>
            <span>{items.length} {items.length === 1 ? "item" : "itens"} em {domains.length} {domains.length === 1 ? "site" : "sites"}</span>
          </div>

          {status ? <p id="status-message" className="status-message" role="status">{status}</p> : null}

          {editing ? (
            <form id="edit-form" className="edit-form" onSubmit={submitEditor}>
              <input id="editing-id" type="hidden" value={editing.id} readOnly />
              <label><span>Título</span><input id="title-input" value={title} maxLength={80} onChange={(event) => setTitle(event.currentTarget.value)} /></label>
              <label><span>Conteúdo</span><textarea id="content-input" rows={4} maxLength={8000} required value={content} onChange={(event) => setContent(event.currentTarget.value)} /></label>
              <label className="checkbox-row"><input id="global-input" type="checkbox" checked={globalItem} onChange={(event) => setGlobalItem(event.currentTarget.checked)} /><span>Item global</span></label>
              <div className="form-actions">
                <Button variant="primary" icon="check" type="submit">Salvar alterações</Button>
                <Button id="cancel-edit-button" variant="ghost" onClick={closeEditor}>Cancelar</Button>
              </div>
            </form>
          ) : null}

          <FilterBar filters={filters} active={activeFilter} onChange={setActiveFilter} />

          <div id="groups" className="groups">
            {filteredItems.length === 0 ? <div className="empty">Nenhum item encontrado para a busca ou filtro atual.</div> : null}
            {[...grouped.entries()].map(([name, group]) => (
              <section className="group" key={name}>
                <div className="group-heading">
                  {name === "Itens globais" ? <Badge tone="global" icon="globe">{name}</Badge> : <Badge mono>{name}</Badge>}
                  <span>{group.length} {group.length === 1 ? "item" : "itens"}</span>
                </div>
                <div className="group-grid">
                  {group.map((item) => (
                    <ClipboardItemCard
                      key={item.id}
                      item={item}
                      copied={copiedId === item.id}
                      onCopy={copyItem}
                      onFavorite={toggleFavorite}
                      onEdit={openEditor}
                      onDelete={deleteItem}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <aside className="options-side">
          <section className="side-privacy">
            <div><Icon name="shield-check" size={18} /><strong>Local-first</strong></div>
            <p>Seus dados ficam neste navegador. Faça um backup para levar para outro computador.</p>
          </section>
          <section className="side-summary">
            <SectionLabel>Resumo</SectionLabel>
            <dl>
              <div><dt>Total de itens</dt><dd>{items.length}</dd></div>
              <div><dt>Sites</dt><dd>{domains.length}</dd></div>
              <div><dt>Globais</dt><dd>{items.filter((item) => item.scope === "global").length}</dd></div>
              <div><dt>Fixados</dt><dd>{items.filter((item) => item.favorite).length}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
