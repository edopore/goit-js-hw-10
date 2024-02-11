import SlimSelect from 'slim-select';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectItem = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');
const pLoading = document.querySelector('.loader');
const pError = document.querySelector('.error');

const catImage = document.createElement('img');
const catDesc = document.createElement('div');
const catBreed = document.createElement('div');
const catBreedTitle = document.createElement('h2');
const breedDesc = document.createElement('p');
const catTemperament = document.createElement('p');

catDesc.setAttribute('class', 'cat-desc');
catBreed.setAttribute('class', 'cat-params');

catBreed.append(catBreedTitle, breedDesc, catTemperament);
catDesc.append(catImage, catBreed);
catInfo.append(catDesc);

fetchBreeds()
  .then(data => {
    console.log(data);

    try {
      data.forEach(element => {
        let item = document.createElement('option');
        item.setAttribute('value', element.id);
        item.textContent = element.name;
        selectItem.append(item);
      });
      new SlimSelect({
        select: '.breed-select',
      });
    } catch (error) {
      Notify.failure(pError.textContent);
    }
  })
  .catch(error => {
    Notify.failure(pError.textContent);
    Notify.failure(error);
  });

selectItem.addEventListener('change', () => {
  fetchCatByBreed(selectItem.value)
    .then(data => {
      catImage.setAttribute('src', data[0].url);
      catImage.setAttribute('width', '350');
      return data[0];
    })
    .then(({ breeds }) => {
      catBreedTitle.textContent = breeds[0].name;
      breedDesc.textContent = breeds[0].description;
      catTemperament.innerHTML =
        '<span>Temperament: </span>' + breeds[0].temperament;
    })
    .catch(error => {
      Notify.failure(pError.textContent);
      Notify.failure(error);
    });
});
selectItem.addEventListener('load', () => {
  console.log('cargas');
  pLoading.classList.toggle('error-view');
});
