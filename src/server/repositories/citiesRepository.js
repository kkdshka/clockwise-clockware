const db = require('../models');
const City = db.city;
const CityTranslation = db.city_translation;

//city = {name, id}
function addCity(cityData) {
    return City.create(cityData).then(city => city.id)
        .catch(error => console.log(error));
}

function addCityTranslations(cityTranslations) {
    return db.sequelize.queryInterface.bulkInsert('city_translations', cityTranslations, {})
        .catch(error => console.log(error));
}

function editCity(city) {
    return City.update(city, {where: {id: city.id}})
        .catch(error => console.log(error));
}

function editCityTranslations(cityTranslations) {
    return cityTranslations.forEach((translation) => {
        return CityTranslation.update(translation, {where: {id: translation.id}})
            .catch(error => console.log(error));
    });
}

function deleteCity(id) {
    return City.destroy({where: {id: id}});
}

function getAllCities() {
    return City.findAll()
        .catch(error => console.log(error));
}

function getCityTranslations() {
    return CityTranslation.findAll({
        include: {model: City}
    }).catch(error => console.log(error));
}

module.exports = {
    addCity: addCity,
    editCity: editCity,
    deleteCity: deleteCity,
    getCities: getAllCities,
    addTranslations: addCityTranslations,
    editTranslations: editCityTranslations,
    getTranslations: getCityTranslations
};