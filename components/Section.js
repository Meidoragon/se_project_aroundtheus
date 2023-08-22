/**
 * The Section class is for rendering a list of elements on a page
 */

export default class Section {
  #renderedItems
  #renderer
  #container
  
  constructor({items, renderer}, element) {
    this.#renderedItems = items;
    this.#renderer = renderer.bind(this);
    this.#container = element;
  }

  setItem(element, append = true) {
    if (append){
      this.#container.append(element);
    } else {
      this.#container.prepend(element);
    }
  }

  addItem(element) {
    this.setItem(element, false);
  }

  clear() {
    this.#container.innerHTML = '';
  }

  renderItems(){
    this.#renderedItems.forEach(item => {
      this.#renderer(item);
    });
  }
}