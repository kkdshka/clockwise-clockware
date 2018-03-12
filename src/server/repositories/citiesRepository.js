const City = require('../models/cityModel');
const pool = require('../database');

//city = {name, id}
function addCity(city) {
    pool.query("INSERT INTO cities SET ? ON DUPLICATE KEY UPDATE name = name", city, function (error, results) {
        if (error)
            throw error;
        console.log('City added with id ' + results.insertId);
    });
}

function editCity(city) {
    const sql = "UPDATE cities SET name = ? WHERE id = ?";
    const data = [city.name, city.id];
    pool.query(sql, data, function (error) {
        if (error)
            throw error;
        console.log('City edited');
    });
}

function deleteCity(id) {
    pool.query("DELETE FROM cities WHERE id = ?", id, function (error) {
        if (error)
            throw error;
        console.log('City deleted');
    });
}

function getAllCities() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM cities", (error, results) => {
            if (error) {
                return reject(error);
            }
            let models = [];
            for (let i = 0; i < results.length; i++) {
                const row = results[i];
                const city = new City(row.name, row.id);
                models.push(city);
            }
            resolve(models);
        });
    });
}

module.exports = {
    add: addCity,
    edit: editCity,
    delete: deleteCity,
    getAll: getAllCities
};