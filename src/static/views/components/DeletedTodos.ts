export default class DeletedTodos extends HTMLElement {
  connectedCallback() {
    const deletedTodos: string[] = JSON.parse(localStorage.getItem("deleted-todos")!) || [];
    this.initDeletedTodos(deletedTodos);
    this.insertDeletedTodos(deletedTodos);
    this.clearLocalStorage();
  }

  private clearLocalStorage() {
    this.querySelector("#clearDeletedTodos")?.addEventListener("click", () => {
      document
        .querySelectorAll('#DeletedParent div[id^="parent"]')
        .forEach((e) => e.remove()); //.forEach(e => e.remove())
      localStorage.removeItem("deleted-todos");
    });
  }

  private initDeletedTodos(deletedTodos: string[]) {
    if (!!deletedTodos) {
      deletedTodos.map((todo: string) => {
        const div = document.createElement("div");
        div.innerHTML = todo;
        const insertAnchor = this.querySelector("#deletedtodo");
        insertAnchor?.insertAdjacentElement(
          "beforebegin",
          <Element>div.firstChild,
        );
      });
    }
  }

  private insertDeletedTodos(deletedTodos: string[]) {
    this.addEventListener("htmx:afterSettle", (ev: Event) => {
      if ((ev.target as Element)?.id.includes("parent")) {
        const target = document.getElementById((ev.target as Element)?.id);
        deletedTodos.push(target?.outerHTML!);
        localStorage.setItem("deleted-todos", JSON.stringify(deletedTodos));
      }
    });
  }
}

if (!customElements.get("deleted-todos"))
  customElements.define("deleted-todos", DeletedTodos);
