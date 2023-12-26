import components from "./views/components";

class Island extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const src = this.getAttribute("src") ?? "";
    const componentLoader = components[src];
    console.log(componentLoader);
    if (!componentLoader)
      throw new Error(`${src} is not a component! Check your islands/index.`);

    const clientMediaQuery = this.getAttribute("client:media");
    if (clientMediaQuery) await media({ query: clientMediaQuery });

    //This is just to load the custom element since it can't be defined inside another component
    const Component = (await componentLoader()).default;
    const className = new Component().constructor.name.toLowerCase();
    const WebComponent = `<${className}-component></${className}-component>`;
    //close of the shadow dom?
    this.innerHTML = WebComponent;
    //this.replaceWith(`<lazy-load></lazy-load>`)
  }
}
customElements.define("vite-islands", Island);

//These are functions that are used for lazyloading in a number of different ways

function media({ query }: { query: string }) {
  const mediaQuery = window.matchMedia(query);
  return new Promise(function (resolve) {
    if (mediaQuery.matches) resolve(true);
    else mediaQuery.addEventListener("change", resolve, { once: true });
  });
}
