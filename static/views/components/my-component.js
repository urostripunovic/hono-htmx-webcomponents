class MyComponent extends HTMLElement {
    _shadow;
    _deletedTodos = [];
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: "open" });
        this._render();
    }

    connectedCallback() {
        console.log("-- connectedCallback","Component has mounted")
        //hämta local storage här ifrån och fyll på div
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //när en knapp trycks så kommer den att renderas om och blir större, dvs rendera om map
        console.log("-- attributeChangedCallback", name, oldValue, newValue)
    }

    //Gör en div med samma css som de andra två
    get template() {
        return `
            Hello Web Component!!
        `;
    }

    _render() {
        this._shadow.innerHTML = this.template;
    }
}
customElements.define('my-component', MyComponent);
