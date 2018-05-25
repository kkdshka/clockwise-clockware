import axios from "axios/index";

export default class CityTranslations {
    constructor(language) {
        this.cityTranslations = [];
        this.getCitiesTranslations();
        this.language = language;
    }

    getCitiesTranslations() {
        return axios.get('/admin/cities/translations')
            .then(res => this.cityTranslations = res.data)
            .catch(error => console.log(error));
    }

    getTranslation(cityId, language) {
        try {
            return this.cityTranslations.filter((cityTranslation) => {
                return cityTranslation.city_id === cityId && cityTranslation.language === language;
            })[0].name;
        }
        catch (error) {
            console.log("city with id " + cityId + " doesn't have translation");
        }
    }

    getName(cityId) {
        try {
            return this.cityTranslations.filter((cityTranslation) => {
                return cityTranslation.city_id === cityId && cityTranslation.language === this.language;
            })[0].name;
        }
        catch (error) {
            console.log("city with id " + cityId + " doesn't have translation");
        }
    }

    getId(cityId, language) {
        try {
            return this.cityTranslations.filter((cityTranslation) => {
                return cityTranslation.city_id === cityId && cityTranslation.language === language;
            })[0].id;
        }
        catch (error) {
            console.log("city with id " + cityId + " doesn't have translation");
        }
    }

    onCitiesChange() {
        return this.getCitiesTranslations();
    }

    changeLanguage(language) {
        this.language = language;
    }
}