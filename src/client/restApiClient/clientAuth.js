import axios from "axios/index";

function signIn(signInData) {
    return axios.post('/client/sign-in', signInData)
        .then(res => res)
        .catch(error => error.response);
}

function signOut() {
    axios.post('client/sign-out')
        .catch(error => console.log(error));
}

module.exports = {
    signIn: signIn,
    signOut: signOut
};