/**
 * The Section class is for rendering a list of elements on a page
 */

export default class Section {
  #renderedItems
  #renderer
  #container
  
  /**
   * manage group of items to be rendered on page after initial load
   * @param {array} items Array of objects containing items to render
   * @param {function} renderer renderer function
   * @param {element} element element to which the items are added
   */
  constructor(items, renderer, element) {
    this.#renderedItems = items;
    this.#renderer = renderer.bind(this);
    this.#container = element;
  }

  /**
   * add new item to section at end
   * @param {element} element element to add to list
   */
  appendItem(element){
    this.#container.append(element);
  }

  /**
   * add new item to beginning of section
   * @param {element} element element to add to list
   */
  prependItem(element){
    this.#container.prepend(element);
  }

  /**
   * render initial list of items
   */
  renderItems(){
    this.#renderedItems.forEach((item) => {
      this.#renderer(item);
    });
  }
}
