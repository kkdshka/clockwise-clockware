const db = require('../models');
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;
const City = db.city;
const Client = db.client;

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    return Reservation.create(reservation)
        .then(model => model.id);
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
    })
}

function getAllReservations() {
    return Reservation.findAll({
        include: [City, Watchmaker, Client],
        order: [['start_time', 'DESC']],
    });
}

function getReservationById(id) {
    return Reservation.findOne({
        where: {id: id},
        include: [City, Watchmaker]
    });
}

module.exports = {
    add: addReservation,
    edit: editReservation,
    delete: deleteReservation,
    getAll: getAllReservations,
    getById: getReservationById
};