class MyComponent extends HTMLElement {
  constructor() {
      super();
  }
  
  connectedCallback() {
      this.innerHTML = `<p>Hello, Uros!</p>`;
  }
}

if(!customElements.get('my-component')) customElements.define('my-component', MyComponent);