const moment = require('moment');

function isValidName(name) {
    return name.length > 2;
}

function isValidEmail(email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

function isValidDate(startTime, finishTime) {
    return moment(startTime).isBefore(moment(finishTime)) && moment().isBefore(moment(startTime));
}

function isValidReservation(params) {
    return isValidName(params.name) && isValidEmail(params.email) && isValidDate(params.start_time, params.finish_time);
}

function isValidWatchmakerName(name) {
    return name.length > 0;
}

function isValidCityName(name) {
    return name.length > 0;
}

module.exports = {
    isValidName: isValidName,
    isValidEmail: isValidEmail,
    isValidDate: isValidDate,
    isValidReservation: isValidReservation,
    isValidWatchmakerName: isValidWatchmakerName,
    isValidCityName: isValidCityName
};