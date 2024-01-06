export default class TodoForm extends HTMLElement {
  private template: HTMLTemplateElement = document.createElement("template");
  shadowRoot: ShadowRoot;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.template.innerHTML = `
    <style>
      .center-text {
        text-align: center;
        color: #ef4444;
        font-size: 1rem;
        line-height: 1.5rem;
        display: block;
      }
      .start-text {
        display: none;
      }
    </style>
    <slot/>
    `;
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.inputCSSField();
    this.inputErrorHandling();
  }

  private inputCSSField() {
    this.addEventListener("input", (e: Event) => {
      const input = this.querySelector("form div input");
      const styles =
        "focus:shadow-outline appearance-none rounded border border-red-500 leading-tight shadow focus:outline-none".split(
          " ",
        );
      if ((e.target as HTMLInputElement)?.value.length < 3)
        input?.classList.add(...styles);
      else input?.classList.remove(...styles);
    });
  }

  private inputErrorHandling() {
    const p = document.createElement("p");
    this.addEventListener("htmx:afterRequest", (ev) => {
      //@ts-ignore
      if (!ev.detail.failed) {
        this.shadowRoot.querySelector("p")?.remove();
        //this.querySelector("form")?.reset();
      } else {
        this.shadowRoot.appendChild(p);
        p.innerHTML =
          '<p class="center-text"> The todo needs to be at least 3 characters long </p>';
      }
    });
  }
}

if (!customElements.get("todo-form"))
  customElements.define("todo-form", TodoForm);
