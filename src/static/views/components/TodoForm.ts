const TodoFormCustomName = "todo-form";
export default class TodoForm extends HTMLElement {
  private shadow: ShadowRoot;
  private template: HTMLTemplateElement = document.createElement('template');
    constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template.innerHTML = '<slot/>';
    this.shadow.appendChild(this.template.content.cloneNode(true))
  }

  connectedCallback() {
    this.addEventListener("htmx:afterRequest", () => {
      document.querySelector("form")!.reset();
    });
  }

  get CustomElementsName() {
    return TodoFormCustomName;
  }
}

if (!customElements.get(TodoFormCustomName))
  customElements.define(TodoFormCustomName, TodoForm);
