const MY_KEY = 'key=19055497-436f2f9143aedeb9fa32eebb3';
const BASE_URL = 'https://pixabay.com/api/?';

export default class ApiService {
  constructor() {
    this.search = '';
    this.page = '1';
    this.per_page = 12;
  }

  async searchImages() {
    const url = `${BASE_URL}${MY_KEY}&q=${this.search}&orientation=horizontal&per_page=${this.per_page}&page=${this.page}`;

    this.incrementPage();

    return (await (await fetch(url)).json()).hits;

    //  const url = `${BASE_URL}${key}&q=${this.search}&orientation=horizontal&per_page=6&page=${this.page}`;
    //   return fetch(url)
    //     .then(r => {
    //       if (r.ok) return r.json();
    //       throw new Error(r.statusText);
    //     })
    //     .then(data => {
    //       this.incremantPage();
    //       return data;
    //     });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.search;
  }
  set query(newQuery) {
    this.search = newQuery;
  }
}
