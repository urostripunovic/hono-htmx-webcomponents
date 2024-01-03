export default class DeletedTodos extends HTMLElement {
  connectedCallback() {
    console.log("nytt")
    document.addEventListener('click', () => console.log(this.children))
  }
}

if (!customElements.get("deleted-todos"))
  customElements.define("deleted-todos", DeletedTodos);
