'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('reservations', 'client_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'clients',
                key: 'id'
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('reservations', 'client_id');
    }
};

