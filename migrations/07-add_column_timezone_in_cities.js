'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('cities', 'timezone', {
            type: Sequelize.STRING,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('cities', 'timezone');
    }
};