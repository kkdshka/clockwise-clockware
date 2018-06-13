'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('reservations', 'name').then(() => {
            return queryInterface.removeColumn('reservations', 'email').then(() => {
                return queryInterface.addColumn('reservations', 'client_id', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'clients',
                        key: 'id'
                    },
                });
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('reservations', 'client_id').then(() => {
            return queryInterface.addColumn('reservations', 'email', {
                type: Sequelize.STRING,
                allowNull: false
            }).then(() => {
                return queryInterface.addColumn('reservations', 'name', {
                    type: Sequelize.STRING,
                    allowNull: false
                });
            });
        });
    }
};