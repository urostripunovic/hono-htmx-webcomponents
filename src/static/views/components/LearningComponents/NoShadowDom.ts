const NoShadowComponentCustomName = 'noshadow-dom'
export default class NoShadowDom extends HTMLElement {
  static observedAttributes = ["name"];
  private template: HTMLTemplateElement;

  constructor() {
    super();
    //console.log(this.hasAttribute("name"))
    this.template = document.createElement("template");
    this.template.innerHTML = `
            <div id="test" class="p-1 border-solid border-2 border-cyan-800">
            Hello from the web component with no shadow dom
            </div>
            `;
    !this.hasAttribute("name") &&
      this.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(
      "-- attributeChangedCallback",
      "prop: " + name,
      "old: " + oldValue,
      "new: " + newValue,
    );
    //will only be called if a prop is passed, will be appended to the end either way
    this.insertBefore(
      this.template.content.cloneNode(true),
      document.querySelector(newValue),
    );
  }

  get CustomElementsName() {
    return NoShadowComponentCustomName;
}
}

if (!customElements.get(NoShadowComponentCustomName))
  customElements.define(NoShadowComponentCustomName, NoShadowDom);

//this.appendChild(template.content.cloneNode(true)); //is inserted last
//this.insertBefore(template.content.cloneNode(true), this.firstChild);// if you want it be inserted first
//this.insertBefore(template.content.cloneNode(true), this.childNodes[0]);// if you want it be inserted first
//document.querySelector("#cool-div-tag")!.insertAdjacentElement('afterend', template.content.cloneNode(true)); //works only with elements and not document fragments
