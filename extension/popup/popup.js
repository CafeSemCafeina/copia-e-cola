(function initPopup() {
  const domainApi = window.CopiaEColaDomain;
  const storageApi = window.CopiaEColaStorage;
  const backupApi = window.CopiaEColaBackup;

  const els = {
    appContent: document.getElementById("app-content"),
    backToListButton: document.getElementById("back-to-list-button"),
    backupToggle: document.getElementById("backup-toggle"),
    cancelDeleteButton: document.getElementById("cancel-delete-button"),
    cancelEditButton: document.getElementById("cancel-edit-button"),
    clearSearchButton: document.getElementById("clear-search-button"),
    confirmDeleteButton: document.getElementById("confirm-delete-button"),
    contentInput: document.getElementById("content-input"),
    deleteBody: document.getElementById("delete-body"),
    deleteDialog: document.getElementById("delete-dialog"),
    domainCount: document.getElementById("domain-count"),
    domainList: document.getElementById("domain-list"),
    domainSummary: document.getElementById("domain-summary"),
    domainTitle: document.getElementById("domain-title"),
    exportButton: document.getElementById("export-button"),
    globalCount: document.getElementById("global-count"),
    globalInput: document.getElementById("global-input"),
    globalList: document.getElementById("global-list"),
    globalSection: document.getElementById("global-section"),
    importInput: document.getElementById("import-input"),
    importSummary: document.getElementById("import-summary"),
    itemForm: document.getElementById("item-form"),
    itemTemplate: document.getElementById("item-template"),
    editingId: document.getElementById("editing-id"),
    listView: document.getElementById("list-view"),
    openComposerButton: document.getElementById("open-composer-button"),
    saveButton: document.getElementById("save-button"),
    searchInput: document.getElementById("search-input"),
    settingsButton: document.getElementById("settings-button"),
    settingsTotal: document.getElementById("settings-total"),
    settingsView: document.getElementById("settings-view"),
    titleInput: document.getElementById("title-input"),
    toast: document.getElementById("toast"),
    unsupportedState: document.getElementById("unsupported-state")
  };

  let currentDomain = null;
  let allItems = [];
  let copiedId = null;
  let pendingDeleteItem = null;
  let toastTimer = null;

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.hidden = false;
    toastTimer = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  function showError(error) {
    showToast(error && error.message ? error.message : "Algo deu errado.");
  }

  function showSettings() {
    els.listView.hidden = true;
    els.settingsView.hidden = false;
    els.settingsTotal.textContent = String(allItems.length);
  }

  function showList() {
    els.settingsView.hidden = true;
    els.listView.hidden = false;
  }

  async function getActiveUrl() {
    const testActiveUrl = new URLSearchParams(window.location.search).get("activeUrl");

    if (testActiveUrl) {
      return testActiveUrl;
    }

    if (typeof chrome === "undefined" || !chrome.tabs || !chrome.tabs.query) {
      return window.location.href;
    }

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0] && tabs[0].url ? tabs[0].url : "";
  }

  function formatMeta(item) {
    if (item.lastCopiedAt) {
      return `Copiado em ${new Date(item.lastCopiedAt).toLocaleDateString("pt-BR")}`;
    }

    return `Atualizado em ${new Date(item.updatedAt).toLocaleDateString("pt-BR")}`;
  }

  function matchesQuery(item, query) {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return true;
    }

    return `${item.title} ${item.content} ${item.domain || "global"}`.toLowerCase().includes(needle);
  }

  function emptyMessage(text, actionText) {
    const el = document.createElement("div");
    el.className = "notice";

    const title = document.createElement("strong");
    title.textContent = text;
    el.append(title);

    if (actionText) {
      const body = document.createElement("span");
      body.textContent = actionText;
      el.append(body);
    }

    return el;
  }

  function openComposer(item) {
    els.openComposerButton.hidden = true;
    els.itemForm.hidden = false;
    els.editingId.value = item ? item.id : "";
    els.titleInput.value = item ? item.title : "";
    els.contentInput.value = item ? item.content : "";
    els.globalInput.checked = item ? item.scope === "global" : false;
    els.saveButton.textContent = item ? "Salvar alterações" : "Salvar";
    els.contentInput.focus();
  }

  function resetForm() {
    els.editingId.value = "";
    els.titleInput.value = "";
    els.contentInput.value = "";
    els.globalInput.checked = false;
    els.saveButton.textContent = "Salvar";
    els.itemForm.hidden = true;
    els.openComposerButton.hidden = false;
  }

  function renderItem(item) {
    const fragment = els.itemTemplate.content.cloneNode(true);
    const root = fragment.querySelector(".clipboard-item");
    const title = fragment.querySelector(".clipboard-item__title");
    const content = fragment.querySelector(".clipboard-item__content");
    const meta = fragment.querySelector(".clipboard-item__meta");
    const scope = fragment.querySelector(".clipboard-item__scope");
    const copyButton = fragment.querySelector(".clipboard-item__copy");
    const favoriteButton = fragment.querySelector(".favorite-action");
    const editButton = fragment.querySelector(".edit-action");
    const deleteButton = fragment.querySelector(".delete-action");

    root.dataset.id = item.id;
    root.classList.toggle("clipboard-item--copied", copiedId === item.id);
    title.textContent = item.favorite ? `★ ${item.title}` : item.title;
    content.textContent = item.content;
    meta.textContent = formatMeta(item);
    scope.textContent = item.scope === "global" ? "Global" : "";
    favoriteButton.textContent = item.favorite ? "Desafixar" : "Fixar";

    copyButton.addEventListener("click", () => copyItem(item));
    favoriteButton.addEventListener("click", () => updateFavorite(item.id));
    editButton.addEventListener("click", () => openComposer(item));
    deleteButton.addEventListener("click", () => openDeleteDialog(item));

    return fragment;
  }

  function render() {
    const query = els.searchInput.value;
    const domainItems = allItems.filter((item) => item.scope === "domain" && item.domain === currentDomain && matchesQuery(item, query));
    const globalItems = allItems.filter((item) => item.scope === "global" && matchesQuery(item, query));
    const domainTotal = allItems.filter((item) => item.scope === "domain" && item.domain === currentDomain).length;

    els.clearSearchButton.hidden = query.trim().length === 0;
    els.domainSummary.textContent = `${domainTotal} ${domainTotal === 1 ? "item" : "itens"} neste site`;
    els.domainList.replaceChildren();
    els.globalList.replaceChildren();
    els.domainCount.textContent = String(domainItems.length);
    els.globalCount.textContent = String(globalItems.length);
    els.settingsTotal.textContent = String(allItems.length);

    if (domainItems.length === 0 && globalItems.length === 0) {
      if (query.trim()) {
        els.domainList.append(emptyMessage("Nenhum item encontrado", `Nada corresponde a "${query.trim()}".`));
      } else {
        els.domainList.append(emptyMessage("Nenhum item salvo para este site ainda", "Cole um texto, dê um título opcional e salve para reutilizar aqui."));
      }
    } else if (domainItems.length === 0) {
      els.domainList.append(emptyMessage(`Nenhum item para ${currentDomain}.`));
    } else {
      domainItems.forEach((item) => els.domainList.append(renderItem(item)));
    }

    els.globalSection.hidden = globalItems.length === 0;
    globalItems.forEach((item) => els.globalList.append(renderItem(item)));
  }

  async function refresh() {
    allItems = await storageApi.readAll();
    render();
  }

  async function submitForm(event) {
    event.preventDefault();

    const content = els.contentInput.value.trim();
    if (!content) {
      showToast("Conteúdo obrigatório.");
      return;
    }

    const scope = els.globalInput.checked ? "global" : "domain";
    const id = els.editingId.value || undefined;

    try {
      await storageApi.upsertItem({
        id,
        scope,
        domain: scope === "domain" ? currentDomain : null,
        title: els.titleInput.value,
        content
      });
      resetForm();
      await refresh();
      showToast(id ? "Alterações salvas." : "Item salvo.");
    } catch (error) {
      showError(error);
    }
  }

  async function copyItem(item) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(item.content);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = item.content;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      copiedId = item.id;
      await storageApi.markCopied(item.id);
      await refresh();
      showToast("Copiado para a área de transferência.");
      setTimeout(() => {
        if (copiedId === item.id) {
          copiedId = null;
          render();
        }
      }, 1300);
    } catch (error) {
      showError(error);
    }
  }

  async function updateFavorite(id) {
    try {
      const changed = await storageApi.toggleFavorite(id);
      await refresh();
      showToast(changed && changed.favorite ? "Item fixado." : "Item desafixado.");
    } catch (error) {
      showError(error);
    }
  }

  function openDeleteDialog(item) {
    pendingDeleteItem = item;
    els.deleteBody.textContent = `Excluir "${item.title}"? Essa ação remove apenas este texto salvo.`;
    els.deleteDialog.hidden = false;
    els.cancelDeleteButton.focus();
  }

  function closeDeleteDialog() {
    pendingDeleteItem = null;
    els.deleteDialog.hidden = true;
  }

  async function confirmDelete() {
    if (!pendingDeleteItem) {
      return;
    }

    try {
      const item = pendingDeleteItem;
      await storageApi.deleteItem(item.id);
      closeDeleteDialog();
      await refresh();
      showToast("Item excluído.");
    } catch (error) {
      showError(error);
    }
  }

  async function exportJson() {
    try {
      const payload = backupApi.buildExport(await storageApi.readAll());
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `copia-e-cola-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast("Backup exportado.");
    } catch (error) {
      showError(error);
    }
  }

  async function importJson(file) {
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const importedItems = backupApi.parseImportPayload(text, storageApi.normalizeItem);
      const currentItems = await storageApi.readAll();
      const result = backupApi.mergeImportedItems(currentItems, importedItems);
      await storageApi.writeAll(result.items);
      await refresh();
      const message = `${result.imported} itens importados. ${result.skipped} duplicados ignorados.`;
      els.importSummary.textContent = message;
      els.importSummary.hidden = false;
      showToast(message);
    } catch (error) {
      els.importSummary.textContent = error && error.message ? error.message : "Não foi possível importar.";
      els.importSummary.hidden = false;
      showError(error);
    } finally {
      els.importInput.value = "";
    }
  }

  async function boot() {
    try {
      const activeUrl = await getActiveUrl();
      currentDomain = domainApi.domainFromUrl(activeUrl);

      if (!currentDomain) {
        els.domainTitle.textContent = "Página não suportada";
        els.domainSummary.textContent = "Sem contexto de domínio";
        els.unsupportedState.hidden = false;
        els.appContent.hidden = true;
        return;
      }

      els.domainTitle.textContent = currentDomain;
      els.unsupportedState.hidden = true;
      els.appContent.hidden = false;
      await refresh();
    } catch (error) {
      els.domainTitle.textContent = "Erro ao abrir";
      showError(error);
    }
  }

  els.itemForm.addEventListener("submit", submitForm);
  els.cancelEditButton.addEventListener("click", resetForm);
  els.openComposerButton.addEventListener("click", () => openComposer());
  els.searchInput.addEventListener("input", render);
  els.clearSearchButton.addEventListener("click", () => {
    els.searchInput.value = "";
    render();
    els.searchInput.focus();
  });
  els.settingsButton.addEventListener("click", showSettings);
  els.backupToggle.addEventListener("click", showSettings);
  els.backToListButton.addEventListener("click", showList);
  els.exportButton.addEventListener("click", exportJson);
  els.importInput.addEventListener("change", () => importJson(els.importInput.files[0]));
  els.cancelDeleteButton.addEventListener("click", closeDeleteDialog);
  els.confirmDeleteButton.addEventListener("click", confirmDelete);

  boot();
})();
