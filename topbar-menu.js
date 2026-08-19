(() => {
  const menu = document.querySelector(".topbar-menu");
  const toggle = document.querySelector(".topbar-menu-toggle");
  const panel = document.getElementById("topbar-menu-panel");
  if (!menu || !toggle || !panel) return;

  const compact = window.matchMedia("(max-width: 1280px)");

  function setOpen(open) {
    const useMenu = compact.matches;
    menu.classList.toggle("is-open", useMenu && open);
    toggle.setAttribute("aria-expanded", useMenu && open ? "true" : "false");
    if (useMenu) {
      panel.setAttribute("aria-hidden", open ? "false" : "true");
    } else {
      panel.removeAttribute("aria-hidden");
    }
  }

  function close() {
    setOpen(false);
  }

  setOpen(false);
  compact.addEventListener("change", close);

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!menu.classList.contains("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  document.getElementById("account-open")?.addEventListener("click", close);
})();
