export class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<p>My Web Component</p>`;
    }
}

customElements.define("my-component", MyComponent);
