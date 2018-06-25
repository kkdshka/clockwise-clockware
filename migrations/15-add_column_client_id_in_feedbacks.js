'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('feedbacks', 'client_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'clients',
                    key: 'id'
                },
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('feedbacks', 'client_id');
    }
};