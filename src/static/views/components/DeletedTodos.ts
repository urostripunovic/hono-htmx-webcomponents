const DeletedTodosCustomName = 'deleted-todos';
export default class DeletedTodos extends HTMLElement {
    private elementChildren: Array<ChildNode> = [];
    private template: HTMLTemplateElement = document.createElement('template');
    static observedAttributes = ['location'];
    constructor() {
        super();
        this.template.innerHTML = `
            <div id="test" class="p-1 border-solid border-2 border-cyan-800">
                Deleted Todos
            </div>
        `;
        //console.log("constructor", this.hasAttribute("location"))
        !this.hasAttribute("location") && this.appendChild(this.template.content.cloneNode(true))
    }

    connectedCallback() {}

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        //will only be called if a prop is passed, will be appended to the end either way
        console.log(name, newValue, oldValue)
        this.insertBefore(this.template.content.cloneNode(true), document.querySelector(newValue));
    }

    get CustomElementsName() {
        return DeletedTodosCustomName;
    }
}

if (!customElements.get(DeletedTodosCustomName))
    customElements.define(DeletedTodosCustomName, DeletedTodos);