export default class CountryApiServices {
    constructor() {
        this.country = '';
    }

    fetchCountry() {
        return fetch(`https://restcountries.com/v2/name/${this.country}?fields=name,capital,population,flags,languages`).then(resolve => {
            if (!resolve.ok) {
                throw new Error(resolve.statusText);
            }

            return resolve.json();
        });
    }

    

    get countries() {
        return this.country;
    }

    set countries(newCountry) {
        this.country = newCountry;
    }
} 