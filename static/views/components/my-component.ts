//import { Styles } from "../../lib/styles";
//import applyColor  from 'assets/test.module.css' assert { type: "css" };

class MyComponent extends HTMLElement {
    private shadow: ShadowRoot; 
    private test: number = 0;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        //<link rel="stylesheet" href="/dist/index.css" type="text/css"/>  
        template.innerHTML = `
            <p id="foo" class="font-bold text-red-300">This is a web component with the shadow dom open!</p>
            <slot></slot> 
            <slot />
        `;

        this.shadow.appendChild(template.content.cloneNode(true));
        //document.getElementById('foo')!.className = applyColor;
    }

    connectedCallback() {}
}

if (!customElements.get('my-component'))
    customElements.define('my-component', MyComponent);

