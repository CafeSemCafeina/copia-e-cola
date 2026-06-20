import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  outDirTemplate: ".",
  manifest: {
    name: "Copia e Cola",
    description: "Clipboard local-first por site para textos reutilizáveis.",
    permissions: ["activeTab", "storage"],
    host_permissions: ["<all_urls>"],
    icons: {
      "16": "/assets/icons/icon-16.png",
      "32": "/assets/icons/icon-32.png",
      "48": "/assets/icons/icon-48.png",
      "128": "/assets/icons/icon-128.png"
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'"
    }
  }
});
