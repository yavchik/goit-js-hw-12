export function getImage(image) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44562390-aecbf7bf64fbbf331d9c706fa',
    q: image,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  return fetch(url)
    .then(data => data.json())
    .catch(error => console.log(error));
}
