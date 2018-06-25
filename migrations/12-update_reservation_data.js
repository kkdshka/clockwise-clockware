'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query('UPDATE reservations SET client_id = (SELECT id FROM clients WHERE email = reservations.email);');
    },
    down: (queryInterface) => {

    }
};