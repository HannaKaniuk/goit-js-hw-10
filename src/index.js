import 'notiflix/dist/notiflix-3.2.6.min.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/style.css';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};



class ElementVisibilityManager {
    constructor(loaderElement, errorElement) {
      this.loaderElement = loaderElement;
      this.errorElement = errorElement;
      
    }
  
    showLoader() {
      this.loaderElement.style.display = 'block';
    }
  
    hideLoader() {
      this.loaderElement.style.display = 'none';
    }
  
    showError() {
      this.errorElement.style.display = 'block';
    }
  
    hideError() {
      this.errorElement.style.display = 'none';
    }
  }
  
  const visibilityManager = new ElementVisibilityManager(refs.loader, refs.error);


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
        <h3>Temperament:</h3>
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
  visibilityManager.showLoader();
  visibilityManager.hideError();

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      visibilityManager.hideLoader();
      const catHtml = catTemplate(catData);
      
      refs.catInfo.innerHTML = catHtml;
      refs.catInfo.style.display = 'block';
    })
    .catch((err) => {
      visibilityManager.hideLoader();
      visibilityManager.showError();
      refs.catInfo.style.display = 'block';
      Notiflix.Report.failure(
        'Notiflix Failure',
        '"Failure is simply the opportunity to begin again, this time more intelligently." <br/><br/>- Henry Ford',
        'Okay',
        );
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
    new SlimSelect({
        select: '.breed-select'
      })
    visibilityManager.hideLoader();
  })
  .catch((err) => {
    visibilityManager.showError();
    console.error('Ошибка при получении пород:', err);
    refs.catInfo.style.display = 'block';
    visibilityManager.hideLoader();
  });

refs.breedSelect.addEventListener('change', onSelectChange);




















































