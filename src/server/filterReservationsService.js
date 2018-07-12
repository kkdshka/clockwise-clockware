const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment-timezone");

module.exports =  function(params) {
    const where = {};
    if (params.city_id) {
        where.city_id = params.city_id;
    }
    if (params.watchmaker_id) {
        where.watchmaker_id = params.watchmaker_id;
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