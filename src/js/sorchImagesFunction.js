const debounce = require('lodash.debounce');
import templatesCard from '../templates/createCard.hbs';
import ApiService from './apiService';
const containerCard = document.querySelector('.gallery');
const btnEl = document.querySelector('[data-action=load]');
// const list = document.querySelector('.stylelist');

const inputEl = document.querySelector('[name="query"]');

inputEl.addEventListener('input', debounce(onInputSearchImages, 500));
btnEl.addEventListener('click', debounce(fetchCreateMarcupLoadMore, 300));

const apiService = new ApiService();
// lol();

function onInputSearchImages(e) {
  e.preventDefault();

  clearList();
  if (e.target.value.length === 0) {
    btnEl.disabled = true;
    return;
  }

  btnEl.disabled = false;

  apiService.query = e.target.value;
  apiService.resetPage();
  fetchCreateMarcupLoadMore();
}
// inputEl.addEventListener('keydown', function (e) {
//   if (e.code === 'Enter') {
//     e.preventDefault();
//   }
// });

async function fetchCreateMarcupLoadMore(e) {
  try {
    const hits = await apiService.searchImages();

    await markup(hits);

    scroll();
  } catch (error) {
    console.warn(error);
  }
}

function markup(data) {
  const cards = templatesCard(data);
  containerCard.insertAdjacentHTML('beforeend', cards);
}

function scroll() {
  window.scrollTo({
    top: selectedFrame.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
}

function clearList() {
  containerCard.innerHTML = '';
}

function lol() {
  const list = document.querySelectorAll('.list-style');

  if (list.length < 1) {
    btnEl.disabled = true;
  }
}

// function onInputSearchImages(e) {
//   // if (e.target.value.leanght === 0) {
//   //   clearList();
//   // }
//   console.log(e.target.value);
//   apiService.query = e.target.value;
//   clearList();
//   apiService.resetPage();
//   apiService
//     .searchImages()
//     .then(markup)
//     .catch(error => {
//       alert('як би ти зламав систему...');
//     });
// }
