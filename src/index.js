import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(e => {
    onSearch();
  }, DEBOUNCE_DELAY)
);

async function onSearch(e) {
  const nameCountry = input.value.trim();
  cleanHtml();

  if (nameCountry !== '') {
    try {
      const data = await fetchCountries(nameCountry);
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data);
      } else if (data.length === 1) {
        renderCountry(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
        <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
