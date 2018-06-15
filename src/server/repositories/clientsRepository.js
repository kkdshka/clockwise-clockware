const db = require('../models');
const Client = db.client;

//client = {name, city, email, id}
function addClient(client) {
    return Client.findOne({where: {email: client.email}}).then((model) => {
        if(!model) {
            return Client.create(client)
                .then((res) => res.id)
                .catch(error => console.log(error));
        }
        return Client.update(client, {where: {email: client.email}})
            .then(() => model.id)
            .catch((error) => console.log(error));
    }).catch(error => console.log(error));
}

function editClient(client) {
    return Client.update(client, {
        where: {
            id: client.id
        }
    }).catch(error => console.log(error));
}

function deleteClient(id) {
    return Client.destroy({
        where: {
            id: id
        }
    });
}

function getAllClients() {
    return Client.findAll()
        .catch(error => console.log(error));
}

module.exports = {
    add: addClient,
    edit: editClient,
    delete: deleteClient,
    getAll: getAllClients
};