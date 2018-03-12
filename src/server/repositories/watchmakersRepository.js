const Watchmaker = require('../models/watchmakerModel');
const pool = require('../database');

//watchmaker = {name, city, rate, id}
function addWatchmaker(watchmaker) {
    pool.query("INSERT INTO watchmakers SET ?", watchmaker, function (error, results) {
        if (error)
            throw error;
        console.log('Watchmaker added with id ' + results.insertId);
    });
}

function editWatchmaker(watchmaker) {
    const sql = "UPDATE watchmakers SET name = ?, city = ?, rating = ? WHERE id = ?";
    const data = [watchmaker.name, watchmaker.city, watchmaker.rating, watchmaker.id];
    pool.query(sql, data, function (error) {
        if (error)
            throw error;
        console.log('Watchmaker edited');
    });
}

function deleteWatchmaker(id) {
    pool.query("DELETE FROM watchmakers WHERE id = ?", id, function (error) {
        if (error)
            throw error;
        console.log('Watchmaker deleted');
    });
}

function getAllWatchmakers() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM watchmakers", (error, results) => {
            if (error) {
                return reject(error);
            }
            let models = [];
            for (let i = 0; i < results.length; i++) {
                const row = results[i];
                const watchmaker = new Watchmaker(row.name, row.city, row.rating, row.id);
                models.push(watchmaker);
            }
            resolve(models);
        });
    });
}

module.exports = {
    add: addWatchmaker,
    edit: editWatchmaker,
    delete: deleteWatchmaker,
    getAll: getAllWatchmakers
};