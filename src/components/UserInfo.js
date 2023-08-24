/**
 * "The UserInfo class is responsible for rendering information about the user on the page."
 */
export default class UserInfo{
  #nameElement;
  #descriptionElement;
  #name;
  #description;

  /**
   * Manage getting and setting information in profile section of page
   * @param {element} name element for name
   * @param {element} description element for description
   */
  constructor(name, description){
    this.#nameElement = name;
    this.#descriptionElement = description;
    this.#name = this.#nameElement.textContent;
    this.#description = this.#descriptionElement.textContent
  }

  /**
   * @returns object containing user info
   */
  getUserInfo(){
    return {name: this.#name, description: this.#description};
  }

  /**
   * @param {array} param0 array containing user info [0] = name, [1] = description
   */
  setUserInfo({name, description}){
    this.#name = name;
    this.#description = description;
    this.#nameElement.textContent = this.#name;
    this.#descriptionElement.textContent = this.#description;
  }
}