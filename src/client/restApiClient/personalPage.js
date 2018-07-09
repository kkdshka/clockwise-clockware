import axios from "axios/index";

function getPersonalPage() {
    return axios.get('/personal-page')
        .catch(error => console.log(error.response));
}

function getClientReservations() {
    return axios.get('/personal-page/clients-reservations')
        .then(res => res.data)
        .catch(error => console.log(error));
}

module.exports = {
    getPersonalPage: getPersonalPage,
    getClientReservations: getClientReservations
};