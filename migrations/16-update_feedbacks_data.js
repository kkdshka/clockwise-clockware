'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query('UPDATE feedbacks SET client_id = (SELECT client_id FROM reservations WHERE id = feedbacks.reservation_id);');
    },
    down: (queryInterface) => {
    }
};