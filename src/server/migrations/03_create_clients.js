const pool = require('../database');

function createClients() {
    const createTable = "CREATE TABLE IF NOT EXISTS clients(" +
        "id int NOT NULL AUTO_INCREMENT, " +
        "name varchar(255) NOT NULL, " +
        "email varchar(255) NOT NULL UNIQUE, " +
        "city varchar(255) NOT NULL, " +
        "PRIMARY KEY (id))";

    pool.query(createTable, function (error) {
        if (error)
            throw error;
    });
}

function addClients() {
    const clients = [
        {name: "Максим", city: "Днепр", email: "max@example.com"},
        {name: "Данил", city: "Ужгород", email: "dan@example.com"}
    ];

    clients.forEach((client) => {
        pool.query("INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE name = name, city = city",
            client, function (error) {
            if (error)
                throw error;
        });
    });
}

function createTable() {
    createClients();
    addClients();
}


module.exports = createTable;