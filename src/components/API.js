
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

  #catchErrors(response){
    console.error(response);
  }

  /**
   * 
   * @param {object} item object with 'name' and 'link' elements containing the title of and link to an image to add
   * @returns object stating success, or the error string.
   */
  addNewCard(item){
    return fetch(`${this.#baseURL}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  patchUserInfo(newName, newDescription){
    return fetch (`${this.#baseURL}/users/me`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  deleteCard(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.#headers
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  updateAvatar(link){
    return fetch (`${this.#baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  getUserInfo(){
    return fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  getCardList(){
    return fetch(`${this.#baseURL}/cards`, {
      headers: this.#headers
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  addCardLike(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.#headers
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }

  removeCardLike(cardId){
    return fetch(`${this.#baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.#headers
    })
      .then(this.#handleResponse)
      .catch(this.#catchErrors);
  }
}
