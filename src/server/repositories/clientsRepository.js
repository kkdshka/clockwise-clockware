const Client = require('../models/clientModel');
const pool = require('../database');

//client = {name, city, email, id}
function addClient(client) {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE name = VALUES(name)", client, function (error, results) {
            if (error)
                return reject(error);
            console.log('Client added with id ' + results.insertId);
            resolve();
        });
    });
}

function editClient(client) {
    const sql = "UPDATE clients SET name = ?, email = ? WHERE id = ?";
    const data = [client.name, client.city, client.email, client.id];
    return new Promise((resolve, reject) => {
        pool.query(sql, data, function (error) {
            if (error)
                return reject(error);
            console.log('Client edited');
            resolve();
        });
    });
}

function deleteClient(id) {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM clients WHERE id = ?", id, function (error) {
            if (error)
                return reject(error);
            console.log('Client deleted');
            resolve();
        });
    });
}

function getAllClients() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM clients", (err, results) => {
            if (err) {
                return reject(err);
            }
            const models = results.map((result) => {
                return new Client(result.name, result.email, result.id);
            });
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