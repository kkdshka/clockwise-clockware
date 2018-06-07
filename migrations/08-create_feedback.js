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
            },
            reservation_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('feedbacks');
    }
};