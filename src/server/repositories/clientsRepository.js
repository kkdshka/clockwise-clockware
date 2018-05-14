const db = require('../models');
const Client = db.client;

//client = {name, city, email, id}
function addClient(client) {
    return Client.upsert(client)
}

function editClient(client) {
    return Client.update(client);
}

function deleteClient(id) {
    return Client.destroy({
        where: {
            id: id
        }
    });
}

function getAllClients() {
    return Client.findAll();
}

module.exports = {
    add: addClient,
    edit: editClient,
    delete: deleteClient,
    getAll: getAllClients
};