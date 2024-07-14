import { refs } from '../main';

export function markupImages(images) {
  const markup = images
    .map(image => {
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img
            width="360"
            height="200"
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}" />
          <div class="image-info">
            <p>Likes ${image.likes}</p>
            <p>Views ${image.views}</p>
            <p>Comments ${image.comments}</p>
            <p>Downloads ${image.downloads}</p>
          </div>
        </a>
      </li>`;
    })
    .join('');
  refs.imgGallery.innerHTML = markup;
}
