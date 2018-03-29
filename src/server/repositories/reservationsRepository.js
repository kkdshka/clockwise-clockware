const Reservation = require('../models/reservationModel');
const pool = require('../database');

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    pool.query("INSERT INTO reservations SET ?", reservation, function (error, results) {
        if (error)
            throw error;
        console.log('Reservation added with id ' + results.insertId);
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
    const sql = "UPDATE reservations SET name = ?, city = ?, email = ?, clock_size = ?, date = ?, time = ? WHERE id = ?";
    pool.query(sql, data, function (error) {
        if (error)
            throw error;
        console.log('Reservation edited');
    });
}

function deleteReservation(id) {
    pool.query("DELETE FROM reservations WHERE id = ?", id, function (error) {
        if (error)
            throw error;
        console.log('Reservation deleted');
    });
}

function getAllReservations() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM reservations", (err, results) => {
            if (err) {
                return reject(err);
            }
            const models = results.map((result) => {
                return new Reservation(result.name, result.city, result.email, result.clock_size, result.date, result.time, result.watchmaker_id, result.id);
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