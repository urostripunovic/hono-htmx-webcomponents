import components from "./views/components";

class Island extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const src = this.getAttribute("src") ?? "";
    const componentLoader = components[src];
    if (!componentLoader) throw new Error(`${src} is not a component! Check your islands/index.`);

    const clientMediaQuery = this.getAttribute("client:media");
    if (clientMediaQuery) await media({ query: clientMediaQuery });
    if (this.hasAttribute("client:load")) await load();
    if (this.hasAttribute("client:idle")) await idle();
    if (this.hasAttribute("client:visible")) await visible({ element: this });

    const Component = (await componentLoader()).default;
    const DefinedCustomElement = getCustomElement(Component, components[src])
    this.innerHTML = `<${DefinedCustomElement}></${DefinedCustomElement}>`;
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
function idle(){
  return new Promise(function (resolve) {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(resolve);
    } else {
      setTimeout(resolve, 200);
    }
  });
}

/**
 * @param Component is the instance of the web components exported class code
 * @param src is the import function used for error handling
 * @returns the name of the custom element of that @component @src
 */
function getCustomElement(Component: any, src: () => void) {
  const ClassName = new Component().constructor.name.split(/(?=[A-Z])/);
  const CustomElement = ClassName.map((e: string) =>e.toLowerCase()).join("-");
  if (!customElements.get(CustomElement)) {
    throw new Error(`${CustomElement} is not a defined custom element in ${src}.`);
  }
  return CustomElement
}