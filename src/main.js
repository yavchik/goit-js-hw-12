import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from './js/pixabay-api';
import { markupImages } from './js/render-function';

export const refs = {
  formEl: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.loadmore-button'),
};

let query = '';
let page = 1;
const per_page = 15;
let maxPage = 1;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, enter the query',
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  refs.imgGallery.innerHTML = '';
  page = 1;
  showLoader();
  try {
    const data = await getImage(query, page, per_page);
    maxPage = Math.ceil(data.totalHits / per_page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        layout: 2,
        displayMode: 'once',
        backgroundColor: '#ef4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
      });
      hideLoadBtn();
      return;
    }
    markupImages(data.hits);
    lightbox.refresh();
    showLoadBtn();
    e.target.reset();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  if (page >= maxPage) {
    iziToast.error({
      message: 'No more images to load.',
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
    hideLoadBtn();
    return;
  }

  page += 1;
  showLoader();
  try {
    const data = await getImage(query, page, per_page);
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no more images to load.',
        layout: 2,
        displayMode: 'once',
        backgroundColor: '#ef4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
      });
      hideLoadBtn();
      return;
    }
    markupImages(data.hits);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      layout: 2,
      displayMode: 'once',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    skipOldEl();
  }
});

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function showLoader() {
  refs.loaderEl.classList.remove('hidden');
}

function hideLoader() {
  refs.loaderEl.classList.add('hidden');
}

function showLoadBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

function skipOldEl() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
