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
                unique: true
            },
            watchmaker_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('feedbacks');
    }
};