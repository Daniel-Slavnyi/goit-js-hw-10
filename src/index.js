import './css/styles.css';
import pokemonCards from "./templates/make-card.hbs";
import CountryApiServices from './templates/country-services.js';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryListEl = document.querySelector('.country-list');
const countryItemEl = document.querySelector('.country-info');
const countryApiServices = new CountryApiServices();

const onInputElInput = (e) => {
    countryApiServices.countries = e.target.value.trim();
    
    if (e.target.value === '') { 
        return;
    }

    countryApiServices.fetchCountry().then(data => {
    
    if (data.length > 10) {
        countryListEl.innerHTML = '';
        Notiflix.Notify.info("Too MMany matches found. Please enter a more specific name.");
    }
        
    if (data.length >= 2 && data.length <= 10) {
        makeCountryList(data);
    }
        
    if (data.length === 1) {
        makeCountryCard(data[0]);
    }

    return data;
}).catch(arr => {
    showError();
});
    
    
};

inputEl.addEventListener('input', debounce(onInputElInput, 300));

function showError() {
    countryListEl.innerHTML = '';
    countryItemEl.innerHTML = '';
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function makeCountryCard(elem) {
    countryListEl.innerHTML = '';
    countryItemEl.innerHTML =
        `<img src="${elem.flags.png}" alt=${elem.name}>
        <div>
            <h2 class="cuntry-title">${elem.name}</h2>
            <p class="country-capital">
            Capital: ${elem.capital}
            </p>
            <p class="country-population">
            Population: ${elem.population}
            </p>
            <p class="country-languages">
            Languages: ${elem.languages.map(el => el.name).join(', ')}
            </p>
        </div>`;
}

function makeCountryList(list) {
    let countryList = list.map(el => {
        return  `<li class="country-item">
            <img class="country-img" src="${el.flags.svg}" alt="${el.name}">
            <p class="country-name">
                ${el.name}
            </p> 
        </li>`;
    }).join('');
    console.log(countryList);
    
    countryListEl.innerHTML = '';
    countryItemEl.innerHTML = '';
    countryListEl.innerHTML = countryList;
}




