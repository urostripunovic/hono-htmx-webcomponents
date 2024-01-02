export default class TodoForm extends HTMLElement {
  shadowRoot: ShadowRoot;
  private template: HTMLTemplateElement = document.createElement('template');
    constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.template.innerHTML = '<slot/>';
    this.shadowRoot.append(this.template.content.cloneNode(true))
  }

  connectedCallback() {
    this.addEventListener('input', (e: Event) => console.log((e.target as HTMLInputElement)?.value))

    this.addEventListener("htmx:afterRequest", () => {
      this.querySelector("form")?.reset();
    });
  }
}

if (!customElements.get("todo-form"))
  customElements.define("todo-form", TodoForm);
