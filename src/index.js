import './css/styles.css';
import pokemonCards from "./templates/make-card.hbs";
import CountryApiServices from './templates/news-services.js';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryListEl = document.querySelector('.country-list');
const countryItemEl = document.querySelector('.country-info');
const countryApiServices = new CountryApiServices();

const onInputElInput = (e) => {
    countryApiServices.countries = e.target.value.trim();
    
    if (e.target.value !== '') {
        countryApiServices.fetchPosts().then(data => {
            console.log(data);
            if (data.length > 10) {
                countryListEl.innerHTML = '';
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }

            return data;
        }).then(data => {
            if (data.length >= 2 && data.length <= 10) {
                let countryList = data.map(el => {
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
            return data;
        }).then(data => {
            if (data.length === 1) {
                countryListEl.innerHTML = '';
                countryItemEl.innerHTML =
                    `<img src="${data[0].flags.png}" alt=${data[0].name}>
                    <div>
                        <h2 class="cuntry-title">${data[0].name}</h2>
                        <p class="country-capital">
                        Capital: ${data[0].capital}
                        </p>
                        <p class="country-population">
                        Population: ${data[0].population}
                        </p>
                        <p class="country-languages">
                        Languages: ${data[0].languages.map(el => el.name).join(', ')}
                        </p>
                    </div>`;
            }
        }).catch(arr => {
            countryListEl.innerHTML = '';
            countryItemEl.innerHTML = '';
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
    }
    
};

inputEl.addEventListener('input', debounce( onInputElInput, 300));








