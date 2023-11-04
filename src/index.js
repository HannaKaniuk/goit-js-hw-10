import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.style.display = 'none';
refs.error.style.display = 'none';

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

function showError() {
  refs.error.style.display = 'block';
}

function hideError() {
  refs.error.style.display = 'none';
}

function catTemplate(response) {
  const cat = response[0];
  const template = `
    <div class="cat-card card">
      <div class="image-container">
        <img
          src="${cat.url}"
          alt="${cat.breeds[0].name}"
          class="cat-image"
        />
      </div>
      <div class="cat-body">
        <h1 class="cat-name">${cat.breeds[0].name}</h1>
        <p class="cat-info">
           ${cat.breeds[0].description}
        </p>
        <h3>Характер:</h3>
        <p class="cat-temperament">
          ${cat.breeds[0].temperament}
        </p>
      </div>
    </div>`;
  return template;
}

function onSelectChange(event) {
  const selectedBreedId = event.target.value;
  refs.catInfo.innerHTML = '';
  showLoader();
  hideError();

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      hideLoader();
      const catHtml = catTemplate(catData);
      refs.catInfo.insertAdjacentHTML('beforeend', catHtml);
      refs.catInfo.style.display = 'block';
    })
    .catch((err) => {
      hideLoader();
      showError(); 
      refs.catInfo.style.display = 'block';
    });
}

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);
    });
    refs.breedSelect.style.display = 'block';
    hideLoader();
  })
  .catch((err) => {
    showError(); 
    console.error('Ошибка при получении пород:', err);
    refs.catInfo.style.display = 'block';
    hideLoader();
  });

refs.breedSelect.addEventListener('change', onSelectChange);



















































