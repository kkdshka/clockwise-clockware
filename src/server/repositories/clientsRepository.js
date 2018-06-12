const db = require('../models');
const Client = db.client;

//client = {name, city, email, id}
function addClient(client) {
    return Client.upsert(client)
        .then(model => model.id)
        .catch(error => console.log(error));
}

function editClient(client) {
    return Client.update(client, {
        where: {
            id: client.id
        }
    });
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