'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('cities', [
            {name: 'Днепр'},
            {name: 'Ужгород'},
            {name: 'New York'}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('cities', null, {});
    }
};
