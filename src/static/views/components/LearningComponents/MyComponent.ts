const MyComponentCustomName = 'my-component'
const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = `
            <link rel="stylesheet" href="dist/index.css"/>  
            <p class="font-bold">This is a web component with the shadow dom open!!!</p>
            <slot></slot>
        `;
export default class MyComponent extends HTMLElement {
    private shadow: ShadowRoot; 
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        //const template = document.createElement('template');
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}
    get CustomElementsName() {
        return MyComponentCustomName;
    }
}

if (!customElements.get(MyComponentCustomName))
    customElements.define(MyComponentCustomName, MyComponent);
