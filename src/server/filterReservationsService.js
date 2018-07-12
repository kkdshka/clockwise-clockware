const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment-timezone");

function isNotEmpty(array) {
    return array.length > 0;
}

module.exports =  function(params) {
    const where = {};
    if (isNotEmpty(params.citiesId)) {
        where[Op.or] = params.citiesId;
    }
    if (isNotEmpty(params.watchmakersId)) {
        where[Op.or] = params.watchmakersId;
    }
    if(params.fromDate && params.toDate) {
        where.start_time = {
            [Op.gte]: moment.tz(params.fromDate, 'utc').format(),
            [Op.lte]: moment.tz(params.toDate + "T24:00", 'utc').format()
        };
    } else if (params.fromDate) {
        where.start_time = {[Op.gte]: moment.tz(params.fromDate, 'utc').format()};
    } else if (params.toDate) {
        where.start_time = {[Op.lte]: moment.tz(params.toDate + "T24:00", 'utc').format()};
    }
    return where;
};