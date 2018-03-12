const pool = require('../database');

function createReservations() {
    const createTable = "CREATE TABLE IF NOT EXISTS reservations(" +
        "id int NOT NULL AUTO_INCREMENT, " +
        "name varchar(255) NOT NULL, " +
        "email varchar(255) NOT NULL UNIQUE, " +
        "city varchar(255) NOT NULL, " +
        "clock_size varchar(255) NOT NULL, " +
        "date datetime NOT NULL, " + //Format: YYYY-MM-DD HH:MI:SS
        "PRIMARY KEY (id))";

    pool.query(createTable, function (error) {
        if (error)
            throw error;
    });
}

function dateToString(date) {
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        ' ' + pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes()) +
        ':' + pad(date.getUTCSeconds());
}

function addReservations() {
    const reservations = [
        {
            name: "Максим",
            city: "Днепр",
            email: "max@example.com",
            clock_size: 'маленькие',
            date: dateToString(new Date(Date.now()))
        },
        {
            name: "Данил",
            city: "Ужгород",
            email: "dan@example.com",
            clock_size: 'средние',
            date: dateToString(new Date(Date.now()))
        }
    ];
    reservations.forEach((reservation) => {
        pool.query("INSERT INTO reservations SET ?", reservation, function (error) {
                if (error)
                    throw error;
            });
    });
}

function createTable() {
    createReservations();
    addReservations();
}


module.exports = createTable;