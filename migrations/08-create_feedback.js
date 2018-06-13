'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('feedbacks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            feedback: {
                type: Sequelize.STRING,
            },
            rating: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reservation_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'reservations',
                    key: 'id'
                },
            },
            watchmaker_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'watchmakers',
                    key: 'id'
                },
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('feedbacks');
    }
};