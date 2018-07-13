import axios from "axios/index";

function sendLink(recoveryData) {
    return axios.post('/password-recovery/send-link', recoveryData)
        .then(res => res)
        .catch(error => error.response);
}

function changePassword(data) {
    return axios.post('/password-recovery/recover', data)
        .then(res => res)
        .catch(error => error.response);
}

function destroyToken(token) {
    return axios.delete('/token', {data: {token: token}})
        .then(res => res)
        .catch(error => error.response);
}

module.exports = {
    sendLink: sendLink,
    changePassword: changePassword,
    destroyToken: destroyToken
};

