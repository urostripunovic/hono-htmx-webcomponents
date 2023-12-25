class MyComponent extends HTMLElement {
    private shadow: ShadowRoot; 
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        //this.shadow.adoptedStyleSheets = [style];
        template.innerHTML = `
            <link rel="stylesheet" href="dist/index.css" type="text/css"/>  
            <p class="font-bold">This is a web component with the shadow dom open!!!</p>
            <slot></slot>
        `;

        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}
}

if (!customElements.get('my-component'))
    customElements.define('my-component', MyComponent);
