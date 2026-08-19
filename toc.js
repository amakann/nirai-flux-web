(() => {
  const links = Array.from(document.querySelectorAll(".toc-link"));
  if (!links.length) return;

  const seen = new Set();
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { id, el, link } : null;
    })
    .filter((item) => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

  if (!sections.length) return;

  let activeId = sections[0].id;
  let ticking = false;

  function mobileToc() {
    const nav = document.querySelector(".toc--mobile");
    if (!nav || getComputedStyle(nav).display === "none") return null;
    return nav;
  }

  function highlightOffset() {
    const nav = mobileToc();
    if (nav) {
      return Math.max(24, Math.round(nav.getBoundingClientRect().bottom) + 12);
    }
    return Math.min(120, window.innerHeight * 0.22);
  }

  function scrollActiveIntoView(id) {
    const nav = mobileToc();
    if (!nav) return;
    const link = nav.querySelector(`.toc-link[href="#${id}"]`);
    const scroller = nav.querySelector(".toc-list");
    if (!link || !scroller) return;
    const left =
      link.offsetLeft - scroller.clientWidth / 2 + link.offsetWidth / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    scrollActiveIntoView(id);
  }

  function updateFromScroll() {
    const offset = highlightOffset();
    let current = sections[0].id;
    for (const section of sections) {
      if (section.el.getBoundingClientRect().top - offset <= 0) {
        current = section.id;
      }
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

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollX) window.scrollTo(0, window.scrollY);
    },
    { passive: true }
  );
  updateFromScroll();

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.slice(1);
      if (id) setActive(id);
    });
  });
})();
