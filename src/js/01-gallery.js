// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const list = document.querySelector('ul.gallery');
const markup = galleryItems
  .map(
    item =>
      `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" alt="${item.description}"/></a></li>`
  )
  .join('');
list.insertAdjacentHTML('beforeend', markup);

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
