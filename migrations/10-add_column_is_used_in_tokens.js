'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('token_lifetimes', 'is_used', {
            type: Sequelize.BOOLEAN,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('token_lifetimes', 'is_used');
    }
};