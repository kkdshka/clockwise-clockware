const Client = require('../models/clientModel');
const pool = require('../database');

//client = {name, city, email, id}
function addClient(client) {
    pool.query("INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE name = name, city = city", client, function (error, results) {
        if (error)
            throw error;
        console.log('Client added with id ' + results.insertId);
    });
}

function editClient(client) {
    const sql = "UPDATE clients SET name = ?, city = ?, email = ? WHERE id = ?";
    const data = [client.name, client.city, client.email, client.id];
    pool.query(sql, data, function (error) {
        if (error)
            throw error;
        console.log('Client edited');
    });
}

function deleteClient(id) {
    pool.query("DELETE FROM clients WHERE id = ?", id, function (error) {
        if (error)
            throw error;
        console.log('Client deleted');
    });
}

function getAllClients() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM clients", (err, results) => {
            if (err) {
                return reject(err);
            }
            let models = [];
            for (let i = 0; i < results.length; i++) {
                const row = results[i];
                const client = new Client(row.name, row.city, row.email, row.id);
                models.push(client);
            }
            resolve(models);
        });
    });
}

module.exports = {
    add: addClient,
    edit: editClient,
    delete: deleteClient,
    getAll: getAllClients
};