import axios from "axios/index";

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

module.exports = {
    getClients: getClients,
    addClient: addClient,
    editClient: editClient,
    deleteClient: deleteClient
};