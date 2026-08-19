/** Single source for public Windows download URLs (Cloudflare R2). */
window.NF_DOWNLOAD = {
  version: "1.0.2",
  channel: "beta",
  baseUrl: "https://nirai-flux.com",
  fileName(version) {
    return `NiraiFlux-v${version}-x64-Setup.exe`;
  },
  windowsPath(version) {
    return `download/${this.fileName(version ?? this.version)}`;
  },
  windowsUrl(version) {
    return `${this.baseUrl.replace(/\/$/, "")}/${this.windowsPath(version)}`;
  },
};

function applyDownloadLinks() {
  if (!window.NF_DOWNLOAD) return;
  const url = window.NF_DOWNLOAD.windowsUrl();
  document.querySelectorAll("[data-download='windows']").forEach((el) => {
    el.href = url;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyDownloadLinks);
} else {
  applyDownloadLinks();
}
