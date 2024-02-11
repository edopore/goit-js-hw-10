import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0wIhaeoDJAEGu9P7tzckt9shsFx4HUWYgg7HsaACP284dQCz1boSPmpHnPivarpO';

const BASE_URL = `https://api.thecatapi.com/v1/`;

function fetchBreeds() {
  return axios
    .get(BASE_URL + 'breeds')
    .then(({ data }) => data)
    .catch(error => error);
}

function fetchCatByBreed(breed) {
  return axios
    .get(BASE_URL + `images/search?breed_ids=${breed}`)
    .then(({ data }) => data)
    .catch(error => error);
}

module.exports = {
  fetchBreeds,
  fetchCatByBreed,
};
