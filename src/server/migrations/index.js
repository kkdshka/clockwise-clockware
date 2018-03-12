const createWatchmakersTable = require('./01_create_watchmakers');
const createCitiesTable = require('./02_create_cities');
const createClientsTable = require('./03_create_clients');
const createReservationsTable = require('./04_create_reservations');

module.exports = {
    createWatchmakersTable: createWatchmakersTable,
    createCitiesTable: createCitiesTable,
    createClientsTable: createClientsTable,
    createReservationsTable: createReservationsTable
};