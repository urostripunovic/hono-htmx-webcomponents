import components from "./views/components";
class Island extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute("src") ?? "";
    const componentLoader = components[src];
    if (!componentLoader)
      throw new Error(
        `${src} is not a component! Check your components/index.`,
      );

    const clientMediaQuery = this.getAttribute("client:media");
    if (clientMediaQuery) await media({ query: clientMediaQuery });
    if (this.hasAttribute("client:load")) await load();
    if (this.hasAttribute("client:idle")) await idle();
    if (this.hasAttribute("client:visible")) await visible({ element: this });
    if (this.hasAttribute("client:mouseover")) await mouseover({ element: this });

    (await componentLoader()).default;
  }
}
customElements.define("client-islands", Island);

/**
 * Hydrate this component when a matching media query is found
 */
function media({ query }: { query: string }) {
  const mediaQuery = window.matchMedia(query);
  return new Promise(function (resolve) {
    if (mediaQuery.matches) resolve(true);
    else mediaQuery.addEventListener("change", resolve, { once: true });
  });
}

/**
 * Hydrate this component when the element is visible
 */
function visible({ element }: { element: HTMLElement }) {
  return new Promise(function (resolve) {
    const observer = new IntersectionObserver(async function (entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();
          resolve(true);
        }
      }
    });
    observer.observe(element);
  });
}

/**
 * Hydrates the component when the mouse hovers on it.
 */
function mouseover({ element }: { element: HTMLElement }) {
  return new Promise(function (resolve) {
    element.addEventListener("mouseover", resolve, { once: true });
  });
}

/**
 * Hydrate this component on page reload
 */
function load() {
  return new Promise(function (resolve) {
    window.onload = () => resolve(true);
  });
}

/**
 * Hydrate this component when the page is in an idle state
 */
function idle() {
  return new Promise(function (resolve) {
    if ("requestIdleCallback" in window) (window as any).requestIdleCallback(resolve);
    else setTimeout(resolve, 200);
  });
}
