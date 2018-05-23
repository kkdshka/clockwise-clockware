const db = require('../models');
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;
const City = db.city;

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    return Reservation.create(reservation);
}

function editReservation(reservation) {
    return Reservation.update(reservation, {
        where: {
            id: reservation.id
        }
    });
}

function deleteReservation(id) {
    return Reservation.destroy({
        where: {
            id: id
        }
    });
}

function getAllReservations() {
    return Reservation.findAll({
        include: [City, Watchmaker],
        order: [['date', 'DESC']],
    });
}

module.exports = {
    add: addReservation,
    edit: editReservation,
    delete: deleteReservation,
    getAll: getAllReservations
};