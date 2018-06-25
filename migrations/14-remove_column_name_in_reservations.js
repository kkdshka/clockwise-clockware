'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('reservations', 'name');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('reservations', 'name', {
            type: Sequelize.STRING,
        });
    }
};