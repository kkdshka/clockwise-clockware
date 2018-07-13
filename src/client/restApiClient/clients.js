import axios from "axios/index";

function getClients() {
    return axios.get('/admin/clients/clients-data')
        .then(res => res.data)
        .catch(error => error.response);
}

function addClient(data) {
    return axios.post('/admin/clients/', data)
        .then(res => res)
        .catch(error => error.response);
}

function editClient(data) {
    return axios.put('/admin/clients/', data)
        .then(res => res)
        .catch(error => error.response);
}

function deleteClient(id) {
    return axios.delete('/admin/clients/', {data: {id: id}})
        .then(res => res)
        .catch(error => error.response);
}

module.exports = {
    getClients: getClients,
    addClient: addClient,
    editClient: editClient,
    deleteClient: deleteClient
};