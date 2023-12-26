export class DeletedTodos extends HTMLElement {
    private template: HTMLTemplateElement = document.createElement('template');
    static observedAttributes = ['name'];
    constructor() {
        super();
        this.template.innerHTML = `
            <div id="test" class="p-1 border-solid border-2 border-cyan-800">
                Deleted Todos !!!
            </div>
        `;
        //console.log(this.hasAttribute("name"))
        !this.hasAttribute("name") && this.appendChild(this.template.content.cloneNode(true))
    }

    connectedCallback() {}

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        //will only be called if a prop is passed, will be appended to the end either way
        this.insertBefore(this.template.content.cloneNode(true), document.querySelector(newValue));
    }
}

if (!customElements.get('deleted-todos'))
    customElements.define('deleted-todos', DeletedTodos);
