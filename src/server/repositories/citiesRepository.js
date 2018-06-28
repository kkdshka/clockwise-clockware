const db = require('../models');
const City = db.city;
const CityTranslation = db.city_translation;

//city = {name, id}
function addCity(cityData) {
    return City.create(cityData).then(city => city.id);
}

function addCityTranslations(cityTranslations) {
    return db.sequelize.queryInterface.bulkInsert('city_translations', cityTranslations, {});
}

function editCity(city) {
    return City.update(city, {where: {id: city.id}});
}

function editCityTranslations(cityTranslations) {
    return cityTranslations.forEach((translation) => {
        return CityTranslation.update(translation, {where: {id: translation.id}});
    });
}

function deleteCity(id) {
    return City.destroy({where: {id: id}});
}

function getAllCities() {
    return City.findAll();
}

function getCityTranslations() {
    return CityTranslation.findAll({
        include: {model: City}
    });
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