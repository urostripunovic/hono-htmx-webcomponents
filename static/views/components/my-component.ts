class MyComponent extends HTMLElement {
  constructor() {
      super();
      this.render();
  }
  
  connectedCallback() {}

  private render() {
    this.innerHTML = `
      <p class="font-bold">Hello World!</p>
    `;
  }
}

if(!customElements.get('my-component')) customElements.define('my-component', MyComponent);

//add for tailwind css styling, but that styles the component at run time instead of compile time
//<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" />