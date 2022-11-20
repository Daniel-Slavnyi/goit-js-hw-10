import './css/styles.css';
import pokemonCards from "./templates/make-card.hbs";
import CountryApiServices from './templates/news-services.js';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryListEl = document.querySelector('.country-list');
const countryApiServices = new CountryApiServices();

const onInputElInput = (e) => {
    countryApiServices.countries = e.target.value.trim();
    
    if (e.target.value !== '') {
        countryApiServices.fetchPosts().then(data => {
            console.log(data);
            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }

            return data;
        }).then(data => {
            if (data.length > 2 && data.length <= 10) {
                let countryList = data.map(el => {
                  return  `<li class="country-">
                        <img class="country-img" src="${el.flags.svg}" alt="${el.name}">
                        <p class="country-name">
                            ${el.name}
                        </p> 
                    </li>`;
                }).join('');
                console.log(countryList);
                countryListEl.innerHTML = countryList;
            }
        }).catch(arr => {
            Notiflix.Notify.warning("Oops, there is no country with that name");
        });
    }
    
};

inputEl.addEventListener('input', debounce( onInputElInput, 300));








