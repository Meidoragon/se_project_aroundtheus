/**
 * "The UserInfo class is responsible for rendering information about the user on the page."
 */

/**
 * TODO: loose couple with API object to send requests serverside to update user info
 *    User info changes should not display until server replies with success response.
 */
export default class UserInfo{
  #nameElement;
  #descriptionElement;
  #avatarElement;
  #name;
  #description;
  #avatar;
  #sendInfo

  /**
   * Manage getting and setting information in profile section of page
   * @param {element} name element for name
   * @param {element} description element for description
   * @param {function} sendInfo function to update serverside user info
   */
  constructor(elements, userInfo, sendInfo){
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

    this.#sendInfo = sendInfo;
  }

  /**
   * @returns object containing user info
   */
  getUserInfo(){
    return {username: this.#name, description: this.#description};
  }

  /**
   * @param {object} param0 {username, description}; object containing info with which to update
   */
  setUserInfo({username, description}){
    this.#sendInfo(username, description)
      .then((res) => {
        this.#name = res.name;
        this.#description = res.about;
        this.#nameElement.textContent = res.name;
        this.#descriptionElement.textContent = res.about;
      })
      .catch((res) => {
        console.error(res);
      })
  }

  updateAvatar(newLink){
    this.#avatar = newLink;
    this.#avatarElement.src = newLink;
  }
}