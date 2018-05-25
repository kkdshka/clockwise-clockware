const db = require('../models');
const Watchmaker = db.watchmaker;
const City = db.city;

//watchmaker = {name, city, rate, id}
function addWatchmaker(watchmaker) {
    return Watchmaker.create(watchmaker);
}

function editWatchmaker(watchmaker) {
    return Watchmaker.update(watchmaker, {
        where: {
            id: watchmaker.id
        }
    });
}

function deleteWatchmaker(id) {
    return Watchmaker.destroy({
        where: {
            id: id
        }
    });
}

function getAllWatchmakers() {
    return Watchmaker.findAll({include: {model: City}});
}

function getFreeWatchmakers(data) {
    const query = "SELECT * FROM watchmakers WHERE city_id = :city_id AND id NOT IN " +
        "(SELECT watchmaker_id FROM reservations WHERE city_id = :city_id AND (" +
        "(finish_time > :start_time AND finish_time <= :finish_time)" +
        " OR " +
        "(start_time < :finish_time AND start_time >= :start_time)" +
        " OR " +
        "(start_time <= :start_time AND finish_time >= :finish_time)" +
        "))";
    return db.sequelize.query(query, {
        replacements: data,
        type: db.sequelize.QueryTypes.SELECT,
    });
}

module.exports = {
    add: addWatchmaker,
    edit: editWatchmaker,
    delete: deleteWatchmaker,
    getAll: getAllWatchmakers,
    getFreeWatchmakers: getFreeWatchmakers
};