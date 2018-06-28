'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('city_translations', 'city_id', {
                onDelete: "cascade",
                type: Sequelize.INTEGER,
                references: {
                    model: 'cities',
                    key: 'id'
                },
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('city_translations', 'city_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'cities',
                    key: 'id'
                },
            }
        );
    }
};