const db = require('../models');
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;
const City = db.city;
const Client = db.client;

//reservation = {name, city, email, clockSize, date, id}
function addReservation(reservation) {
    return Reservation.create(reservation)
        .then(model => model.id)
        .catch(error => console.log(error));
}

function editReservation(reservation) {
    return Reservation.update(reservation, {
        where: {
            id: reservation.id
        }
    }).catch(error => console.log(error));
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
    }).catch(error => console.log(error));
}

function getReservationById(id) {
    return Reservation.findOne({
        where: {id: id},
        include: [City, Watchmaker]
    }).catch(error => console.log(error));
}

module.exports = {
    add: addReservation,
    edit: editReservation,
    delete: deleteReservation,
    getAll: getAllReservations,
    getById: getReservationById
};