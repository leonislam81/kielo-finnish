(() => {
  const page = document.getElementById("page-content");
  const context = document.querySelector(".topbar-context");
  const brand = context?.querySelector(".topbar-home-link");
  if (!page || !context || !brand) return;

  const title = document.createElement("span");
  title.className = "topbar-route-context";
  title.setAttribute("aria-live", "polite");
  title.innerHTML = "<small>FINNISH LEARNING CENTRE</small><strong>Learning home</strong>";
  brand.insertAdjacentElement("afterend", title);

  const updateTitle = () => {
    const active = document.querySelector(".sidebar .nav-link.active");
    const label = active?.querySelector("span:not(.nav-icon):not(.nav-count)")?.textContent?.trim();
    const current = label === "Home" ? "Learning home" : label;
    const heading = title.querySelector("strong");
    if (heading && current && heading.textContent !== current) heading.textContent = current;
  };

  updateTitle();
  new MutationObserver(updateTitle).observe(document.getElementById("sidebar"), {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });
  new MutationObserver(updateTitle).observe(page, { childList: true, subtree: true });
})();
