(function initPopup() {
  const domainApi = window.CopiaEColaDomain;
  const storageApi = window.CopiaEColaStorage;
  const backupApi = window.CopiaEColaBackup;

  const els = {
    appContent: document.getElementById("app-content"),
    backupPanel: document.getElementById("backup-panel"),
    backupToggle: document.getElementById("backup-toggle"),
    cancelEditButton: document.getElementById("cancel-edit-button"),
    contentInput: document.getElementById("content-input"),
    domainCount: document.getElementById("domain-count"),
    domainList: document.getElementById("domain-list"),
    domainTitle: document.getElementById("domain-title"),
    exportButton: document.getElementById("export-button"),
    globalCount: document.getElementById("global-count"),
    globalInput: document.getElementById("global-input"),
    globalList: document.getElementById("global-list"),
    globalSection: document.getElementById("global-section"),
    importInput: document.getElementById("import-input"),
    itemForm: document.getElementById("item-form"),
    itemTemplate: document.getElementById("item-template"),
    editingId: document.getElementById("editing-id"),
    saveButton: document.getElementById("save-button"),
    searchInput: document.getElementById("search-input"),
    titleInput: document.getElementById("title-input"),
    toast: document.getElementById("toast"),
    unsupportedState: document.getElementById("unsupported-state")
  };

  let currentDomain = null;
  let allItems = [];
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

  async function getActiveUrl() {
    const testActiveUrl = new URLSearchParams(window.location.search).get("activeUrl");

    if (testActiveUrl && window.location.protocol === "chrome-extension:") {
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

    return `${item.title} ${item.content}`.toLowerCase().includes(needle);
  }

  function emptyMessage(text) {
    const el = document.createElement("p");
    el.className = "notice";
    el.textContent = text;
    return el;
  }

  function renderItem(item) {
    const fragment = els.itemTemplate.content.cloneNode(true);
    const root = fragment.querySelector(".clipboard-item");
    const title = fragment.querySelector(".clipboard-item__title");
    const content = fragment.querySelector(".clipboard-item__content");
    const meta = fragment.querySelector(".clipboard-item__meta");
    const copyButton = fragment.querySelector(".clipboard-item__copy");
    const favoriteButton = fragment.querySelector(".favorite-action");
    const editButton = fragment.querySelector(".edit-action");
    const deleteButton = fragment.querySelector(".delete-action");

    root.dataset.id = item.id;
    title.textContent = item.favorite ? `* ${item.title}` : item.title;
    content.textContent = item.content;
    meta.textContent = item.scope === "global" ? `Global - ${formatMeta(item)}` : formatMeta(item);
    favoriteButton.textContent = item.favorite ? "Desfavoritar" : "Favoritar";

    copyButton.addEventListener("click", () => copyItem(item));
    favoriteButton.addEventListener("click", () => updateFavorite(item.id));
    editButton.addEventListener("click", () => startEdit(item));
    deleteButton.addEventListener("click", () => removeItem(item));

    return fragment;
  }

  function render() {
    const query = els.searchInput.value;
    const domainItems = allItems.filter((item) => item.scope === "domain" && item.domain === currentDomain && matchesQuery(item, query));
    const globalItems = allItems.filter((item) => item.scope === "global" && matchesQuery(item, query));

    els.domainList.replaceChildren();
    els.globalList.replaceChildren();
    els.domainCount.textContent = String(domainItems.length);
    els.globalCount.textContent = String(globalItems.length);

    if (domainItems.length === 0) {
      els.domainList.append(emptyMessage(query ? "Nenhum item encontrado para este site." : "Nenhum item salvo para este site ainda."));
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

  function resetForm() {
    els.editingId.value = "";
    els.titleInput.value = "";
    els.contentInput.value = "";
    els.globalInput.checked = false;
    els.saveButton.textContent = "Salvar";
    els.cancelEditButton.hidden = true;
  }

  function startEdit(item) {
    els.editingId.value = item.id;
    els.titleInput.value = item.title;
    els.contentInput.value = item.content;
    els.globalInput.checked = item.scope === "global";
    els.saveButton.textContent = "Salvar alterações";
    els.cancelEditButton.hidden = false;
    els.contentInput.focus();
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
      showToast(id ? "Item atualizado." : "Item salvo.");
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

      await storageApi.markCopied(item.id);
      await refresh();
      showToast("Copiado.");
    } catch (error) {
      showError(error);
    }
  }

  async function updateFavorite(id) {
    try {
      await storageApi.toggleFavorite(id);
      await refresh();
      showToast("Favorito atualizado.");
    } catch (error) {
      showError(error);
    }
  }

  async function removeItem(item) {
    if (!window.confirm(`Excluir "${item.title}"?`)) {
      return;
    }

    try {
      await storageApi.deleteItem(item.id);
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
      showToast(`${result.imported} itens importados. ${result.skipped} duplicados ignorados.`);
    } catch (error) {
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
  els.searchInput.addEventListener("input", render);
  els.backupToggle.addEventListener("click", () => {
    els.backupPanel.hidden = !els.backupPanel.hidden;
  });
  els.exportButton.addEventListener("click", exportJson);
  els.importInput.addEventListener("change", () => importJson(els.importInput.files[0]));

  boot();
})();
