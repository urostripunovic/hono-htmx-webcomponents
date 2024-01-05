export default class SwapTodos extends HTMLElement {
  connectedCallback() {
    this.addEventListener("htmx:beforeRequest", (e: any) => {
      const id = "parent" + e.target.id;
      document.getElementById(id)?.remove();
    });
    
  }
}

if (!customElements.get("swap-todos"))
  customElements.define("swap-todos", SwapTodos);
