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
  constructor(elements, userInfo){
    this.#nameElement = elements.nameElement;
    this.#descriptionElement = elements.descriptionElement;
    this.#name = userInfo.name;
    this.#description = userInfo.about;
    this.#nameElement.textContent = this.#name;
    this.#descriptionElement.textContent = this.#description;
  }

  /**
   * @returns object containing user info
   */
  getUserInfo(){
    return {username: this.#name, description: this.#description};
  }

  /**
   * @param {array} param0 array containing user info [0] = name, [1] = description
   */
  setUserInfo({username, description}){
    this.#name = username;
    this.#description = description;
    this.#nameElement.textContent = this.#name;
    this.#descriptionElement.textContent = this.#description;
  }
}