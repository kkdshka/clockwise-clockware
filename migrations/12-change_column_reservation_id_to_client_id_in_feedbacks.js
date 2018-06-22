'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;

        return sequelize.transaction((t) => {
            return sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true, transaction: t}).then(() => {
                return queryInterface.removeColumn('feedbacks', 'reservation_id', {transaction: t}).then(() => {
                    return queryInterface.addColumn(
                        'feedbacks', 'client_id',
                        {
                            type: Sequelize.INTEGER,
                            allowNull: false,
                            unique: false,
                            references: {
                                model: 'clients',
                                key: 'id'
                            },
                        }, {transaction: t}
                    ).then(() => {
                        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true, transaction: t})
                    });
                });
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;

        return sequelize.transaction((t) => {
            return sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true, transaction: t}).then(() => {
                return queryInterface.removeColumn('feedbacks', 'client_id', {transaction: t}).then(() => {
                    return queryInterface.addColumn(
                        'feedbacks', 'reservation_id',
                        {
                            type: Sequelize.INTEGER,
                            allowNull: false,
                            unique: true,
                            references: {
                                model: 'reservations',
                                key: 'id'
                            },
                        }, {transaction: t}
                    ).then(() => {
                        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true, transaction: t})
                    });
                });
            });
        });
    }
};