(() => {
  const links = Array.from(document.querySelectorAll(".toc-link"));
  if (!links.length) return;

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

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // Some mobile browsers still allow sideways page drag despite overflow-x:hidden
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
