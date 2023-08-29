
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
      body: JSON.stringify({
        name: item.title,
        link: item.url
      })
    })
      .then(res => this.#handleResponse)
  }

  getUserID(){
    fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      .then(res => this.#handleResponse)
  }
}