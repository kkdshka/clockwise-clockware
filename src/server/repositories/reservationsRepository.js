const Reservation = require('../models/reservationModel');
const Watchmaker = require('../models/watchmakerModel');
const pool = require('../database');

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO reservations SET ?", reservation, function (error, results) {
            if (error)
                return reject(error);
            console.log('Reservation added with id ' + results.insertId);
            resolve();
        });
    });
}

function editReservation(reservation) {
    const data = [
        reservation.name,
        reservation.city,
        reservation.email,
        reservation.clock_size,
        reservation.date,
        reservation.time,
        reservation.watchmaker_id,
        reservation.id
    ];
    const sql = "UPDATE reservations SET name = ?, city = ?, email = ?, clock_size = ?, date = ?, time = ?, watchmaker_id = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, data, function (error) {
            if (error)
                return reject(error);
            console.log('Reservation edited');
            resolve();
        });
    });
}

function deleteReservation(id) {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM reservations WHERE id = ?", id, function (error) {
            if (error)
                return reject(error);
            console.log('Reservation deleted');
            resolve();
        });
    });
}

function getAllReservations() {
    const query = "SELECT reservations.*, watchmakers.name AS w_name, watchmakers.city AS w_city, watchmakers.rating as w_rating" +
        " FROM reservations LEFT JOIN watchmakers ON reservations.watchmaker_id = watchmakers.id";
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            const models = results.map((result) => {
                const watchmaker = new Watchmaker(result.w_name, result.w_city, result.w_rating, result.watchmaker_id);
                return new Reservation(result.name, result.city, result.email, result.clock_size, result.date, result.time, watchmaker, result.id);
            });
            resolve(models);
        });
    });
}

module.exports = {
    add: addReservation,
    edit: editReservation,
    delete: deleteReservation,
    getAll: getAllReservations
};