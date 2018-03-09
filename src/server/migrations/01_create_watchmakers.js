var pool = require('../database');

function createWatchmakers() {
    const createWatchmakersTable = "CREATE TABLE IF NOT EXISTS watchmakers(" +
            "id int NOT NULL AUTO_INCREMENT, " +
            "name varchar(255) NOT NULL, " +
            "city varchar(255) NOT NULL, " +
            "rating int NOT NULL, " +
            "PRIMARY KEY (id))";

    pool.query(createWatchmakersTable, function (error, results, fields) {
        if (error)
            throw error;
        console.log('Watchmakers table was created');
    });
}

function addWatchmakers() {
    const watchmakers = [
        {name: "Михаил", city: "Днепр", rating: "5"},
        {name: "Иван", city: "Ужгород", rating: "4"}
    ];
    
    watchmakers.forEach((watchmaker) => {
        pool.query("INSERT INTO watchmakers SET ?", watchmaker, function (error, results, fields) {
            if (error)
                throw error;
            console.log('Watchmaker added with id ' + results.insertId);
        });
    });
}

function createTable() {
    createWatchmakers();
    addWatchmakers();
}


module.exports = createTable;