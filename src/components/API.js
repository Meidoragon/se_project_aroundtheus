
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
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  addNewCard(item){
    return fetch(`${this.#baseURL}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(item)
    })
      .then(this.#handleResponse)
  }

  getUserInfo(){
    return fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }

  getCardList(){
    return fetch(`${this.#baseURL}/cards`, {
      headers: this.#headers
    })
      .then(this.#handleResponse);
  }
}
