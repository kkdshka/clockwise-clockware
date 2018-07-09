import axios from "axios/index";

function sendLink(recoveryData) {
    return axios.post('/password-recovery/send-link', recoveryData)
        .then(res => res.data)
        .catch(error => console.log(error.response));
}

function changePassword(data) {
    return axios.post('/password-recovery/recover', data)
        .then(res => res.data)
        .catch(error => console.log(error.response));
}

module.exports = {
    sendLink: sendLink,
    changePassword: changePassword
};

