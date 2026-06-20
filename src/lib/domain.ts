const UNSUPPORTED_PROTOCOLS = new Set([
  "about:",
  "chrome:",
  "chrome-extension:",
  "edge:",
  "file:",
  "moz-extension:"
]);

export function normalizeHostname(hostname: string | null | undefined): string | null {
  const cleaned = String(hostname || "").trim().toLowerCase().replace(/\.$/, "");

  if (!cleaned) return null;
  if (cleaned === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(cleaned)) return cleaned;

  return cleaned.startsWith("www.") ? cleaned.slice(4) : cleaned;
}

export function domainFromUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    if (UNSUPPORTED_PROTOCOLS.has(url.protocol)) return null;
    return normalizeHostname(url.hostname);
  } catch {
    return null;
  }
}
