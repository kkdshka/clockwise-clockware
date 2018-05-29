'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('reservations', 'date'),
            queryInterface.changeColumn('reservations', 'start_time', {
                type: Sequelize.DATE,
                allowNull: false
            }),
            queryInterface.changeColumn('reservations', 'finish_time', {
                type: Sequelize.DATE,
                allowNull: false
            }),
        ]
    },
    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.changeColumn('reservations', 'start_time', {
                type: Sequelize.TIME,
                allowNull: false
            }),
            queryInterface.changeColumn('reservations', 'finish_time', {
                type: Sequelize.TIME,
                allowNull: false
            }),
            queryInterface.addColumn('reservations', 'date', {
                type: Sequelize.DATEONLY,
                allowNull: false
            }),
        ]
    }
};