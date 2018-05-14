'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cities', [
            {name: 'Днепр'},
            {name: 'Ужгород'},
            {name: 'New York'}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cities', null, {});
    }
};
