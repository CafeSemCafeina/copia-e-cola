(function defineDomainUtils(global) {
  const UNSUPPORTED_PROTOCOLS = new Set([
    "about:",
    "chrome:",
    "chrome-extension:",
    "edge:",
    "file:",
    "moz-extension:"
  ]);

  function normalizeHostname(hostname) {
    const cleaned = String(hostname || "").trim().toLowerCase().replace(/\.$/, "");

    if (!cleaned) {
      return null;
    }

    if (cleaned === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(cleaned)) {
      return cleaned;
    }

    return cleaned.startsWith("www.") ? cleaned.slice(4) : cleaned;
  }

  function domainFromUrl(rawUrl) {
    if (!rawUrl) {
      return null;
    }

    let url;
    try {
      url = new URL(rawUrl);
    } catch {
      return null;
    }

    if (UNSUPPORTED_PROTOCOLS.has(url.protocol)) {
      return null;
    }

    return normalizeHostname(url.hostname);
  }

  const api = { domainFromUrl, normalizeHostname };

  global.CopiaEColaDomain = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
