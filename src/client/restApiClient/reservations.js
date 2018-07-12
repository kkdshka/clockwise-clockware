import axios from "axios/index";

function getReservations() {
    return axios.get('/admin/reservations/reservations-data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addReservation(data) {
    return axios.post('/admin/reservations/', data)
        .then(res => res)
        .catch(error => console.log(error));
}

function editReservation(data) {
    return axios.put('/admin/reservations/', data)
        .catch(error => console.log(error));
}

function deleteReservation(id) {
    return axios.delete('/admin/reservations/', {data: {id: id}})
        .then(res => res)
        .catch(error => {
            return {
                error: error.response.data,
                status: error.response.status
            }
        });
}

function getFilteredReservations(params) {
    return axios.post('/admin/reservations/filter-reservations', params)
        .then(res => res.data)
        .catch(error => console.log(error));
}

function getReservationById(id) {
    return axios.get('/admin/reservations/:id', {params: {id: id}})
        .then(res => res.data)
        .catch(error => console.log(error));
}

module.exports = {
    getReservations: getReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation,
    getReservationById: getReservationById,
    getFilteredReservations: getFilteredReservations
};