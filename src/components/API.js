
export default class API {
  #baseURL
  #headers
  constructor(options){
    this.#baseURL = options.baseURL;
    this.#headers = options.headers; 
  }

  #handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  }

  /**
   * Catch API related errors
   * Currently just logs to console
   * @param {Promise} response 
   */
  catchErrors(response){
    //TODO: expand this
    console.error(`Error: ${response.status}`);
  }

  /**
   * Send new card information to server
   * @param {object} item object with 'name' and 'link' elements containing the title of and link to an image to add
   * @returns {object} card object that was added.
   */
  addNewCard(item){
    return fetch(`${this.#baseURL}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(item)
    })
      .then(this.#handleResponse)
  }

  /**
   * Send request to update user information stored on server
   * @param {Object} newInfo {name, about}
   * @returns {Object} containing updated user information
   */
  patchUserInfo(newInfo){
    return fetch (`${this.#baseURL}/users/me`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(newInfo)
    })
      .then(this.#handleResponse)
  }

  /**
   * Send request to delete card from server
   * @param {String} cardId id to delete
   * @returns {object} {message} announcing success upon succes
   */
  deleteCard(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }

  /**
   * 
   * @param {string} link link to new image 
   * @returns {object} updated user information object
   */
  updateAvatar(link){
    return fetch (`${this.#baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
      .then(this.#handleResponse)
  }

  /**
   * Get current user information from server
   * @returns {object} {name, about, avatar, _id}
   */
  getUserInfo(){
    return fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }

  /**
   * Get list of cards from server
   * @returns {array} card Objects {createdAt, isLiked, link, name, owner, _id}
   */
  getCardList(){
    return fetch(`${this.#baseURL}/cards`, {
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }

  /**
   * Send request to add like to card
   * @param {string} cardId id for card
   * @returns {object} updated card object
   */
  addCardLike(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }

  /**
   * Send request to remove like from card
   * @param {string} cardId id for card
   * @returns {object} updated card object
   */
  removeCardLike(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }
}
