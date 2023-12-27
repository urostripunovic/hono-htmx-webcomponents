//Make sure to name the component here so that there is a reference to it after the build
const LazyLoadCustomName = 'lazy-load';
export default class LazyLoad extends HTMLElement {
    private template: HTMLTemplateElement;

    constructor() {
      super();
      //console.log(this.hasAttribute("name"))
      this.template = document.createElement("template");
      this.template.innerHTML = `
              <div id="test" class="p-1 border-solid border-2 border-cyan-800">
                Lazy loading...
              </div>
              `;
      this.appendChild(this.template.content.cloneNode(true));
    }
    
    get CustomElementsName() {
      return LazyLoadCustomName;
    }
}
customElements.define(LazyLoadCustomName, LazyLoad);
