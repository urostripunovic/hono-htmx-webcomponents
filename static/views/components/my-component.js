const template = document.createElement('template');

template.innerHTML = `
  <button aria-label="decrease"> - </button>
  <span id="counter_id">0</span>
  <button aria-label="increase"> + </button>

`;

class MyComponent extends HTMLElement {
  constructor() {
    super();

    this._value = 0;

    this.attachShadow({ mode: 'open' });

    const _shadowRoot = this.shadowRoot;
    _shadowRoot.appendChild(template.content.cloneNode(true));

    this.valueElement = _shadowRoot.querySelector('#counter_id');
    this.decreaseButton = _shadowRoot.querySelector(
      'button[aria-label="decrease"]',
    );
    this.increaseButton = _shadowRoot.querySelector(
      'button[aria-label="increase"]',
    );

    this.increaseButton.addEventListener('click', () => this.value++);
    this.decreaseButton.addEventListener('click', () => this.value--);
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName !== 'value') return;

    this.value = parseInt(newValue, 10);
  }

  set value(value) {
    this._value = value;
    this.valueElement.innerText = this._value;
    
  }

  get value() {
    return this._value;
  }
}
customElements.define('my-component', MyComponent);
