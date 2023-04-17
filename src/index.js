import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listOfCoutries: document.querySelector('.country-list'),
  infoOfCoutrry: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(evt) {
  const countryName = evt.target.value.trim();

  if (!countryName) {
    evt.target.reset();
    return;
  }
  fetchCountries(countryName)
    .then(chooseCountry)
    .catch(error => console.log(error));
}

function chooseCountry(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countries.length === 1) {
    refs.listOfCoutries.innerHTML = '';
    return givingInfoAboutOneCountry(countries);
  }

  if (countries.length > 1) {
    refs.infoOfCoutrry.innerHTML = '';
    return givingInfoAboutAllCountry(countries);
  }
}

function givingInfoAboutOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div class="position"><img src="${
        country.flags.svg
      }" width="100" height="60" alt="flag">
            <h2 class="title">${country.name.official}</h2>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p></div>`;
    })
    .join('');
  refs.infoOfCoutrry.innerHTML = markup;
}

function givingInfoAboutAllCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div class="position"><img src="${country.flags.svg}" width="100" height="60" alt="flag">
      <h2 class="title">${country.name.official}</h2></div>`;
    })
    .join('');
  refs.listOfCoutries.innerHTML = markup;
}
