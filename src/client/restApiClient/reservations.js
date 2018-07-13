import axios from "axios/index";

function getReservations() {
    return axios.get('/admin/reservations/reservations-data')
        .then(res => res.data)
        .catch(error => error.response);
}

function addReservation(data) {
    return axios.post('/admin/reservations/', data)
        .then(res => res)
        .catch(error => error.response);
}

function editReservation(data) {
    return axios.put('/admin/reservations/', data)
        .then(res => res)
        .catch(error => error.response);
}

function deleteReservation(id) {
    return axios.delete('/admin/reservations/', {data: {id: id}})
        .then(res => res)
        .catch(error => error.response);
}

function getFilteredReservations(params) {
    return axios.post('/admin/reservations/filter-reservations', params)
        .then(res => res.data)
        .catch(error => error.response);
}

function getReservationById(id) {
    return axios.get('/admin/reservations/:id', {params: {id: id}})
        .then(res => res.data)
        .catch(error => error.response);
}

module.exports = {
    getReservations: getReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation,
    getReservationById: getReservationById,
    getFilteredReservations: getFilteredReservations
};