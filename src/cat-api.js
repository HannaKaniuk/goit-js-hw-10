import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_ZEwP3g8BD7jQg5Oc4KNUjz89LuNZXda9RuyG2McifcYRcLemAyE4aIzVonXznt2X';



export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then((response) => {
    return response.data;

  });
}









































