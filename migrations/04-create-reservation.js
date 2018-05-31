'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reservations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            city_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'cities',
                    key: 'id'
                },
            },
            clock_size: {
                type: Sequelize.STRING,
                allowNull: false
            },
            start_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            finish_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            watchmaker_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'watchmakers',
                    key: 'id'
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('reservations');
    }
};