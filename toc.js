(() => {
  const links = Array.from(document.querySelectorAll(".toc-link"));
  if (!links.length) return;

  const DEFAULT_VIEWPORT = "width=device-width, initial-scale=1, viewport-fit=cover";
  const tocList = document.querySelector(".toc-list");
  const meta = document.querySelector('meta[name="viewport"]');

  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { id, el, link } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  let activeId = sections[0].id;
  let ticking = false;
  let fitTimer = 0;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function updateFromScroll() {
    const offset = Math.min(120, window.innerHeight * 0.22);
    let current = sections[0].id;
    for (const section of sections) {
      const top = section.el.getBoundingClientRect().top;
      if (top - offset <= 0) current = section.id;
    }
    setActive(current);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateFromScroll();
      ticking = false;
    });
  }

  /** Intrinsic width of the TOC chip row (widest mobile content). */
  function measureTocWidth() {
    if (!tocList) return 0;
    const clone = tocList.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.style.cssText =
      "position:absolute;left:0;top:0;visibility:hidden;display:flex;flex-wrap:nowrap;" +
      "width:max-content;max-width:none;min-width:0;margin:0;padding:0 1.5rem;" +
      "overflow:visible;pointer-events:none;height:auto;";
    document.body.appendChild(clone);
    const width = Math.ceil(clone.getBoundingClientRect().width);
    clone.remove();
    return width;
  }

  function fitViewportToToc() {
    if (!meta) return;

    // Phone / small tablet by hardware CSS width — stable after viewport tweaks
    if (screen.width > 980) {
      if (meta.getAttribute("content") !== DEFAULT_VIEWPORT) {
        meta.setAttribute("content", DEFAULT_VIEWPORT);
      }
      return;
    }

    const tocWidth = measureTocWidth();
    if (tocWidth < 1) return;

    const needed = Math.max(tocWidth, Math.ceil(screen.width));
    const next = "width=" + needed + ", initial-scale=1, viewport-fit=cover";
    if (meta.getAttribute("content") !== next) {
      meta.setAttribute("content", next);
    }
  }

  function scheduleFit() {
    window.clearTimeout(fitTimer);
    fitTimer = window.setTimeout(fitViewportToToc, 50);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("orientationchange", scheduleFit, { passive: true });
  document.addEventListener("nf-lang", scheduleFit);
  updateFromScroll();
  scheduleFit();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleFit).catch(function () {});
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.slice(1);
      if (id) setActive(id);
    });
  });
})();
