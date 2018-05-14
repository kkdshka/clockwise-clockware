const db = require('../models');
const Reservation = db.reservation;
const City = db.city;
const Watchmaker = db.watchmaker;

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    return Reservation.create(reservation);
}

function editReservation(reservation) {
    return Reservation.update(reservation);
}

function deleteReservation(id) {
    return Reservation.destroy({
        where: {
            id: id
        }
    });
}

function getAllReservations() {
    return Reservation.findAll({include: [City, Watchmaker]});
}

module.exports = {
    add: addReservation,
    edit: editReservation,
    delete: deleteReservation,
    getAll: getAllReservations
};