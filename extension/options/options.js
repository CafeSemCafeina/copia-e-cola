(function initOptions() {
  const storageApi = window.CopiaEColaStorage;
  const backupApi = window.CopiaEColaBackup;

  const els = {
    cancelEditButton: document.getElementById("cancel-edit-button"),
    contentInput: document.getElementById("content-input"),
    editForm: document.getElementById("edit-form"),
    editingId: document.getElementById("editing-id"),
    exportButton: document.getElementById("export-button"),
    filterList: document.getElementById("filter-list"),
    filterTemplate: document.getElementById("filter-template"),
    globalInput: document.getElementById("global-input"),
    groups: document.getElementById("groups"),
    importInput: document.getElementById("import-input"),
    itemTemplate: document.getElementById("item-template"),
    searchInput: document.getElementById("search-input"),
    statFixed: document.getElementById("stat-fixed"),
    statGlobal: document.getElementById("stat-global"),
    statSites: document.getElementById("stat-sites"),
    statTotal: document.getElementById("stat-total"),
    statusMessage: document.getElementById("status-message"),
    titleInput: document.getElementById("title-input")
  };

  let allItems = [];
  let activeFilter = "all";

  function showStatus(message) {
    els.statusMessage.textContent = message;
  }

  function domains() {
    return [...new Set(allItems.filter((item) => item.scope === "domain").map((item) => item.domain))].sort();
  }

  function updateStats() {
    els.statTotal.textContent = String(allItems.length);
    els.statSites.textContent = String(domains().length);
    els.statGlobal.textContent = String(allItems.filter((item) => item.scope === "global").length);
    els.statFixed.textContent = String(allItems.filter((item) => item.favorite).length);
  }

  function matchesQuery(item) {
    const needle = els.searchInput.value.trim().toLowerCase();
    if (!needle) {
      return true;
    }

    return `${item.title} ${item.content} ${item.domain || "global"}`.toLowerCase().includes(needle);
  }

  function matchesFilter(item) {
    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "fixed") {
      return item.favorite;
    }

    if (activeFilter === "global") {
      return item.scope === "global";
    }

    return item.scope === "domain" && item.domain === activeFilter;
  }

  function renderFilters() {
    const options = [
      ["all", "Todos"],
      ["fixed", "Fixados"],
      ["global", "Globais"],
      ...domains().map((domain) => [domain, domain])
    ];

    els.filterList.replaceChildren();
    for (const [value, label] of options) {
      const fragment = els.filterTemplate.content.cloneNode(true);
      const button = fragment.querySelector("button");
      button.textContent = label;
      button.dataset.filter = value;
      button.setAttribute("aria-pressed", String(activeFilter === value));
      button.addEventListener("click", () => {
        activeFilter = value;
        render();
      });
      els.filterList.append(fragment);
    }
  }

  function groupItems(items) {
    const groups = new Map();

    for (const item of items) {
      const key = item.scope === "global" ? "Globais" : item.domain;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(item);
    }

    return groups;
  }

  function renderItem(item) {
    const fragment = els.itemTemplate.content.cloneNode(true);
    const root = fragment.querySelector(".item-card");
    const title = fragment.querySelector("h3");
    const content = fragment.querySelector(".item-card__content");
    const meta = fragment.querySelector(".item-card__meta");
    const copyButton = fragment.querySelector(".copy-action");
    const favoriteButton = fragment.querySelector(".favorite-action");
    const editButton = fragment.querySelector(".edit-action");
    const deleteButton = fragment.querySelector(".delete-action");

    root.dataset.id = item.id;
    title.textContent = item.favorite ? `★ ${item.title}` : item.title;
    content.textContent = item.content;
    meta.textContent = item.scope === "global" ? "Global" : item.domain;
    favoriteButton.textContent = item.favorite ? "Desafixar" : "Fixar";
    copyButton.addEventListener("click", () => copyItem(item));
    favoriteButton.addEventListener("click", () => toggleFavorite(item.id));
    editButton.addEventListener("click", () => openEditor(item));
    deleteButton.addEventListener("click", () => deleteItem(item));

    return fragment;
  }

  function renderGroups(items) {
    els.groups.replaceChildren();

    if (items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Nenhum item encontrado para a busca ou filtro atual.";
      els.groups.append(empty);
      return;
    }

    for (const [name, group] of groupItems(items)) {
      const section = document.createElement("section");
      section.className = "group";
      const heading = document.createElement("h3");
      heading.textContent = `${name} · ${group.length}`;
      section.append(heading);
      group.forEach((item) => section.append(renderItem(item)));
      els.groups.append(section);
    }
  }

  function render() {
    updateStats();
    renderFilters();
    renderGroups(allItems.filter((item) => matchesQuery(item) && matchesFilter(item)));
  }

  async function refresh() {
    allItems = await storageApi.readAll();
    render();
  }

  function openEditor(item) {
    els.editingId.value = item.id;
    els.titleInput.value = item.title;
    els.contentInput.value = item.content;
    els.globalInput.checked = item.scope === "global";
    els.editForm.hidden = false;
    els.titleInput.focus();
  }

  function closeEditor() {
    els.editingId.value = "";
    els.titleInput.value = "";
    els.contentInput.value = "";
    els.globalInput.checked = false;
    els.editForm.hidden = true;
  }

  async function submitEditor(event) {
    event.preventDefault();
    const existing = allItems.find((item) => item.id === els.editingId.value);
    if (!existing) {
      return;
    }

    const scope = els.globalInput.checked ? "global" : "domain";
    await storageApi.upsertItem({
      id: existing.id,
      scope,
      domain: scope === "domain" ? existing.domain : null,
      title: els.titleInput.value,
      content: els.contentInput.value
    });
    closeEditor();
    await refresh();
    showStatus("Alterações salvas.");
  }

  async function copyItem(item) {
    await navigator.clipboard.writeText(item.content);
    await storageApi.markCopied(item.id);
    await refresh();
    showStatus("Copiado para a área de transferência.");
  }

  async function toggleFavorite(id) {
    const changed = await storageApi.toggleFavorite(id);
    await refresh();
    showStatus(changed && changed.favorite ? "Item fixado." : "Item desafixado.");
  }

  async function deleteItem(item) {
    if (!window.confirm(`Excluir "${item.title}"?`)) {
      return;
    }

    await storageApi.deleteItem(item.id);
    await refresh();
    showStatus("Item excluído.");
  }

  async function exportJson() {
    const payload = backupApi.buildExport(await storageApi.readAll());
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `copia-e-cola-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showStatus("Backup exportado.");
  }

  async function importJson(file) {
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const importedItems = backupApi.parseImportPayload(text, storageApi.normalizeItem);
      const result = backupApi.mergeImportedItems(await storageApi.readAll(), importedItems);
      await storageApi.writeAll(result.items);
      await refresh();
      showStatus(`${result.imported} itens importados. ${result.skipped} duplicados ignorados.`);
    } catch (error) {
      showStatus(error && error.message ? error.message : "Não foi possível importar.");
    } finally {
      els.importInput.value = "";
    }
  }

  els.editForm.addEventListener("submit", submitEditor);
  els.cancelEditButton.addEventListener("click", closeEditor);
  els.searchInput.addEventListener("input", render);
  els.exportButton.addEventListener("click", exportJson);
  els.importInput.addEventListener("change", () => importJson(els.importInput.files[0]));

  refresh();
})();
