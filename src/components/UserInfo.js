export default class UserInfo{
  #nameElement;
  #descriptionElement;
  #avatarElement;


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

    //display name, description, and avatar in page
    this.setUserInfo(userInfo)
    this.updateAvatar(userInfo.avatar)
  }

  /**
   * Gets name and description that are currently on page
   * @returns {object} {username, description}
   */
  getUserInfo(){
    return {username: this.#nameElement.textContent, description: this.#descriptionElement.textContent};
  }

  /**
   * Updates user information on page
   * @param {object} newInfo {name, about} new information to add
   */
  setUserInfo(newInfo){
    this.#nameElement.textContent = newInfo.name;
    this.#descriptionElement.textContent = newInfo.about;
  }

  /**
   * Replaces the current avatar image with the provided link
   * @param {string} newLink link to replacement image 
   */
  updateAvatar(newLink){
    this.#avatarElement.src = newLink;
  }
}