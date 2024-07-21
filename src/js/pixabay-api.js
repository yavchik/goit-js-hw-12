import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export async function getImage(query, page, per_page) {
  const params = {
    key: '44562390-aecbf7bf64fbbf331d9c706fa',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  };
  const res = await axios.get('/api/', { params });
  return res.data;
}
