/**
 * The Section class is for rendering a list of elements on a page
 */

export default class Section {
  #renderedItems
  #renderer
  #container
  
  constructor({items, renderer}, selector) {
    this.#renderedItems = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(selector);
  }

  setItem(element) {
    this.#container.append(element);
  }

  clear() {
    this.#container.innerHTML = '';
  }

  renderItems(){
    this.#clear();
    this.#renderedItems.forEach(item => {
      this.#renderer(item);
    });
  }
}