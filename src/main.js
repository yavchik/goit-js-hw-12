import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import imageUrl from './img/icon';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImage } from './js/pixabay-api';
import { markupImages } from './js/render-function';

export const refs = {
  formEl: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = e.target.elements.query.value.trim();
  getImage(inputValue).then(data => {
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        messageSize: '16',
        imageWidth: 302,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
        iconUrl: imageUrl,
        theme: 'dark',
      });
    }
    return markupImages(data.hits);
  });
  lightbox.refresh();
});

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
