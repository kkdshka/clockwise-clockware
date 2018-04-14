import axios from "axios/index";

function getCities() {
    return axios.get('/admin/cities/data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addCity(data) {
    return axios.post('/admin/cities/', data)
        .catch(error => console.log(error));
}

function editCity(data) {
    return axios.put('/admin/cities/', data)
        .catch(error => console.log(error));
}

function deleteCity(id) {
    return axios.delete('/admin/cities/', {data: {id: id}})
        .catch(error => console.log(error));
}

function getClients() {
    return axios.get('/admin/clients/data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addClient(data) {
    return axios.post('/admin/clients/', data)
        .catch(error => console.log(error));
}

function editClient(data) {
    return axios.put('/admin/clients/', data)
        .catch(error => console.log(error));
}

function deleteClient(id) {
    return axios.delete('/admin/clients/', {data: {id: id}})
        .catch(error => console.log(error));
}

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

function getWatchmakers() {
    return axios.get('/admin/watchmakers/data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addWatchmaker(data) {
    return axios.post('/admin/watchmakers/', data)
        .catch(error => console.log(error));
}

function editWatchmaker(data) {
    return axios.put('/admin/watchmakers/', data)
        .catch(error => console.log(error));
}

function deleteWatchmaker(id) {
    return axios.delete('/admin/watchmakers/', {data: {id: id}})
        .catch(error => console.log(error));
}

function getFreeWatchmakers(params) {
    return axios.get('/admin/watchmakers/free-watchmakers', params)
        .then(res => res.data)
        .catch(error => console.log(error));
}

module.exports = {
    getCities: getCities,
    addCity: addCity,
    editCity: editCity,
    deleteCity: deleteCity,
    getClients: getClients,
    addClient: addClient,
    editClient: editClient,
    deleteClient: deleteClient,
    getReservations: getReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation,
    getWatchmakers: getWatchmakers,
    getFreeWatchmakers: getFreeWatchmakers,
    addWatchmaker: addWatchmaker,
    editWatchmaker: editWatchmaker,
    deleteWatchmaker: deleteWatchmaker
};