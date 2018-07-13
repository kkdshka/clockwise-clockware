import axios from "axios/index";

function getPersonalPage() {
    return axios.get('/personal-page')
        .then(res => res.data)
        .catch(error => error.response);
}

function getClientReservations() {
    return axios.get('/personal-page/clients-reservations')
        .then(res => res.data)
        .catch(error => error.response);
}

module.exports = {
    getPersonalPage: getPersonalPage,
    getClientReservations: getClientReservations
};