import axios from "axios/index";

function signIn(signInData) {
    return axios.post('/sign-in', signInData)
        .then(res => res.data)
        .catch(error => console.log(error.response));
}

module.exports = {
    signIn: signIn
};