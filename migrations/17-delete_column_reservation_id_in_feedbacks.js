'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('feedbacks', 'reservation_id');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('feedbacks', 'reservation_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'reservations',
                    key: 'id'
                },
            });
    }
};