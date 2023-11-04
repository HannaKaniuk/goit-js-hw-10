import axios from 'axios';

// Встановлюємо заголовок x-api-key для всіх запитів Axios
axios.defaults.headers.common['x-api-key'] = 'live_ZEwP3g8BD7jQg5Oc4KNUjz89LuNZXda9RuyG2McifcYRcLemAyE4aIzVonXznt2X';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data.map((breed) => ({
        id: breed.id,
        name: breed.name,
      }));
    });
}


export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      if (response.status !== 200) 
      {
        throw new Error('Network response was not ok');
      }
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error('No cat data found for the specified breed ID');
      }
    })
    .catch((error) => {
      throw new Error(`Failed to fetch cat data: ${error.message}`);
    });
    
}