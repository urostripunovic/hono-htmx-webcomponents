class MyComponent extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
            <link href="static/assets/output.css" rel="stylesheet">
            <p class="font-bold">This is a web component with the shadow dom open</p>
            <slot name="apa"></slot>
            <slot />
        `;

        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}
}

if (!customElements.get('my-component'))
    customElements.define('my-component', MyComponent);
