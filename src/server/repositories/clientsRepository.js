const db = require('../models');
const Client = db.client;

//client = {name, city, email, id}
function addClient(client) {
    return Client.findOne({where: {email: client.email}}).then((model) => {
        if(!model) {
            return Client.create(client)
                .then((res) => res.id)
        }
        return Client.update(client, {where: {email: client.email}})
            .then(() => model.id)
    });
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