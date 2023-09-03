export default class UserInfo{
  #nameElement;
  #descriptionElement;
  #avatarElement;
  #name;
  #description;
  #avatar;

/**
 * Manage getting and setting information in profile section of page
 * @param {object} elements {nameElement, descriptionElement, avatarElement} elements containing relevant profile information
 * @param {object} userInfo {name, about, avatar} strings of user information to popuplate profile information on page
 */
  constructor(elements, userInfo){
    //elements for name, description, and avatar
    this.#nameElement = elements.nameElement;
    this.#descriptionElement = elements.descriptionElement;
    this.#avatarElement = elements.avatarElement;

    //store name, description, and avatar in object
    this.#name = userInfo.name;
    this.#description = userInfo.about;
    this.#avatar = userInfo.avatar;

    //display name, description, and avatar in page
    this.#nameElement.textContent = this.#name;
    this.#descriptionElement.textContent = this.#description;
    this.#avatarElement.src = this.#avatar;
  }

  /**
   * Gets name and description that are currently on page
   * @returns {object} {username, description}
   */
  getUserInfo(){
    return {username: this.#name, description: this.#description};
  }

  /**
   * Updates user information on page
   * @param {object} newInfo {name, about} new information to add
   */
  setUserInfo(newInfo){
    this.#name = newInfo.name;
    this.#description = newInfo.about;
    this.#nameElement.textContent = newInfo.name;
    this.#descriptionElement.textContent = newInfo.about;
  }

  /**
   * Replaces the current avatar image with the provided link
   * @param {string} newLink link to replacement image 
   */
  updateAvatar(newLink){
    this.#avatar = newLink;
    this.#avatarElement.src = newLink;
  }
}