class NoShadowComponent extends HTMLElement {
    private template: HTMLTemplateElement = document.createElement('template');

    static observedAttributes = ['name'];

    constructor() {
        super();
        this.template.innerHTML = `
            <div id="test" class="p-1 border-solid border-2 border-cyan-800">
                Hello from the web component with no shadow dom
            </div>
        `;
    }

    connectedCallback() {}

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(
            '-- attributeChangedCallback',
            'prop: ' + name,
            'old: ' + oldValue,
            'new: ' + newValue
        );
        this.insertBefore(
            this.template.content.cloneNode(true),
            document.querySelector(newValue)
        );
    }
}

if (!customElements.get('noshadow-component'))
    customElements.define('noshadow-component', NoShadowComponent);

//this.appendChild(template.content.cloneNode(true)); //is inserted last
//this.insertBefore(template.content.cloneNode(true), this.firstChild);// if you want it be inserted first
//this.insertBefore(template.content.cloneNode(true), this.childNodes[0]);// if you want it be inserted first
//document.querySelector("#cool-div-tag")!.insertAdjacentElement('afterend', template.content.cloneNode(true)); //works only with elements and not document fragments