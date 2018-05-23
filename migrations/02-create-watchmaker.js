'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('watchmakers', {
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
            rating: {
                type: Sequelize.INTEGER
            },
            city_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'cities',
                    key: 'id'
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('watchmakers');
    }
};