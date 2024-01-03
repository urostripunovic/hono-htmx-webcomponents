export default class SwapTodos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("input", (e: any) => {
      const id = "parent" + e.target.id;
      document.getElementById(id)?.classList.add("hidden");
    });
  }
}

if (!customElements.get("swap-todos"))
  customElements.define("swap-todos", SwapTodos);
