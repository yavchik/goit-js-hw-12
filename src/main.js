import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// aaaaaaaaa
import { getImage } from './js/pixabay-api';
import { markupImages } from './js/render-function';

export const refs = {
  formEl: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = e.target.elements.query.value.trim();
  if (inputValue === '') {
    refs.imgGallery.innerHTML = '';
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
  showLoader();

  getImage(inputValue)
    .then(data => {
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
        return;
      }
      markupImages(data.hits);
      lightbox.refresh();
      refs.formEl.reset();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        layout: 2,
        displayMode: 'once',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
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
