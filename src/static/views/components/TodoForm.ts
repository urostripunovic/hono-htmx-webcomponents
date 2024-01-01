export default class TodoForm extends HTMLElement {
  //private shadow: ShadowRoot;
  private template: HTMLTemplateElement = document.createElement('template');
    constructor() {
    super();
    //this.shadow = this.attachShadow({ mode: 'open' });
    //this.template.innerHTML = '<slot/>';
    //this.shadow.appendChild(this.template.content.cloneNode(true))
  }

  connectedCallback() {
    this.addEventListener("htmx:afterRequest", () => {
      this.querySelector("form")?.reset();
    });
  }
}

if (!customElements.get("todo-form"))
  customElements.define("todo-form", TodoForm);
