'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('reservations', 'email');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('reservations', 'email', {
            type: Sequelize.STRING,
        });
    }
};