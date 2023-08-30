
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
    console.log(item);
    return fetch(`${this.#baseURL}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(item)
    })
      .then(res => this.#handleResponse)
  }

  getUserID(){
    fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      .then(res => this.#handleResponse)
  }

  getCardList(){
    fetch(`${this.#baseURL}/cards`, {
      headers: this.#headers
    })
      .then(res => this.#handleResponse)
      .then((result) => {
        // console.log(result)
      })
  }
}