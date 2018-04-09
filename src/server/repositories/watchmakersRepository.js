const Watchmaker = require('../models/watchmakerModel');
const pool = require('../database');

//watchmaker = {name, city, rate, id}
function addWatchmaker(watchmaker) {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO watchmakers SET ?", watchmaker, function (error, results) {
            if (error)
                return reject(error);
            console.log('Watchmaker added with id ' + results.insertId);
        });
    });
}

function editWatchmaker(watchmaker) {
    const sql = "UPDATE watchmakers SET name = ?, city = ?, rating = ? WHERE id = ?";
    const data = [watchmaker.name, watchmaker.city, watchmaker.rating, watchmaker.id];
    return new Promise((resolve, reject) => {
        pool.query(sql, data, function (error) {
            if (error)
                return reject(error);
            console.log('Watchmaker edited');
        });
    });
}

function deleteWatchmaker(id) {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM watchmakers WHERE id = ?", id, function (error) {
            if (error)
                return reject(error);
            console.log('Watchmaker deleted');
        });
    });
}

function getAllWatchmakers() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM watchmakers", (error, results) => {
            if (error) {
                return reject(error);
            }
            const models = results.map((result) => {
                return new Watchmaker(result.name, result.city, result.rating, result.id);
            });
            resolve(models);
        });
    });
}

function getFreeWatchmakers(data) {
    //   SELECT * FROM watchmakers WHERE city = 'Ужгород' AND id NOT IN (SELECT watchmaker_id FROM reservations WHERE city = 'Ужгород' AND date = '2018-03-14'  AND ((end_time > '15:00' AND end_time <= '17:00') OR (time < '17:00' AND time >= '15:00')));
    const query = "SELECT * FROM watchmakers WHERE city = ? AND id NOT IN " +
        "(SELECT watchmaker_id FROM reservations WHERE city = ? AND date = ?  AND (" +
        "(end_time > ? AND end_time <= ?)" +
        " OR " +
        "(time < ? AND time >= ?)" +
        " OR " +
        "(time <= ? AND end_time >= ?)" +
        "))";
    return new Promise((resolve, reject) => {
        pool.query(query, data, (error, results) => {
            if (error) {
                return reject(error);
            }
            const models = results.map((result) => {
                return new Watchmaker(result.name, result.city, result.rating, result.id);
            });
            resolve(models);
        });
    });
}

module.exports = {
    add: addWatchmaker,
    edit: editWatchmaker,
    delete: deleteWatchmaker,
    getAll: getAllWatchmakers,
    getFreeWatchmakers: getFreeWatchmakers
};