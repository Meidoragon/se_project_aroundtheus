
export default class API {
  #baseURL
  #headers
  constructor(options){
    this.#baseURL = options.baseURL;
    this.#headers = options.headers;

    
    
  }

  addNewCard(item){
    //adding new cards returns status 400
    return fetch(`${this.#baseURL}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({
        name: item.title,
        link: item.url
      })
    })
      // .then(res => res.json())
      // .then((response) => console.log(response));
  }

  getUserID(){
    //however getting the ID works fine
    fetch(`${this.#baseURL}/users/me`, {
      headers: this.#headers
    })
      // .then(res => res.json())
      // .then((response) => console.log(response));
  }
}