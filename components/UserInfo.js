/**
 * "The UserInfo class is responsible for rendering information about the user on the page."
 */
export default class UserInfo{
  #nameElement;
  #descriptionElement;
  #name;
  #description;

  constructor(name, description){
    // console.log(name);
    // console.log(description);
    this.#nameElement = name;
    this.#descriptionElement = description;
    this.#name = this.#nameElement.textContent;
    this.#description = this.#descriptionElement.textContent
  }

  getUserInfo(){
    return {name: this.#name, description: this.#description};
  }

  setUserInfo([ userName, userDescription ]){
    this.#name = userName;
    this.#description = userDescription;
    this.#nameElement.textContent = this.#name;
    this.#descriptionElement.textContent = this.#description;
  }
}