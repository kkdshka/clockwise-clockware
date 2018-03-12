const pool = require('../database');

function createCities() {
    const createTable = "CREATE TABLE IF NOT EXISTS cities(" +
        "id int NOT NULL AUTO_INCREMENT, " +
        "name varchar(255) NOT NULL, " +
        "PRIMARY KEY (id)," +
        "UNIQUE KEY(name))";

    pool.query(createTable, function (error) {
        if (error)
            throw error;
        console.log('Cities table was created');
    });
}

function addCities() {
    const cities = [
        {name: "Днепр"},
        {name: "Ужгород"}
    ];

    cities.forEach((city) => {
        pool.query("INSERT INTO cities SET ? ON DUPLICATE KEY UPDATE name = name", city, function (error) {
            if (error)
                throw error;
        });
    });
}

function createTable() {
    createCities();
    addCities();
}


module.exports = createTable;