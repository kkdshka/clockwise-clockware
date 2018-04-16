import axios from "axios/index";

function getReservations() {
    return axios.get('/admin/reservations/data')
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
        .catch(error => console.log(error));
}

module.exports = {
    getReservations: getReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation
};