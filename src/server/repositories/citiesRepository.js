const db = require('../models');
const City = db.city;

//city = {name, id}
function addCity(city) {
    return City.create(city);
}

function editCity(city) {
    return City.update(city, {
        where: {
            id: city.id
        }
    });
}

function deleteCity(id) {
    return City.destroy({
        where: {
            id: id
        }
    });
}

function getAllCities() {
    return City.findAll();
}

module.exports = {
    add: addCity,
    edit: editCity,
    delete: deleteCity,
    getAll: getAllCities
};