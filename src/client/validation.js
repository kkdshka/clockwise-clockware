const moment = require('moment');

function isValidName(name) {
    return name.length > 2;
}

function isValidEmail(email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

function isValidDate(date) {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    return new Date(date) > today;
}

function isValidTime(time, date) {
    const reservationDate = new Date(date);
    const today = new Date();
    if (reservationDate.getDate() === today.getDate() && reservationDate.getMonth() === today.getMonth() && reservationDate.getFullYear() === today.getFullYear()) {
        const currentHours = today.getHours();
        const reservationHours = (new Date('1970-01-01T' + time)).getHours();
        return reservationHours > 8 && reservationHours > currentHours && reservationHours < 18;
    }
    else {
        return new Date('1970-01-01T' + time) > new Date('1970-01-01T08:59') && new Date('1970-01-01T' + time) < new Date('1970-01-01T18:01');
    }
}

function isValidDateToSend(startTime, finishTime) {
    return moment(startTime).isBefore(moment(finishTime)) && moment().isBefore(moment(startTime));
}

function isValidReservation(params) {
    return isValidName(params.name) && isValidEmail(params.email) && isValidDateToSend(params.start_time, params.finish_time);
}

function isValidWatchmakerName(name) {
    return name.length > 0;
}

function isValidCityName(name) {
    return name.length > 0;
}

function isValidImageFile(file) {
    const validExtentions = ['jpg', 'jpeg', 'png'];
    const splitFile = file.split('.');
    const fileExtention = splitFile[(splitFile.length - 1)];
    return validExtentions.indexOf(fileExtention) >= 0 ? true : false;
}

function isValidClient(clientData) {
    return isValidName(clientData.name) && isValidEmail(clientData.email);
}

function isValidPassword(password) {
    return password.length > 7;
}

module.exports = {
    isValidName: isValidName,
    isValidEmail: isValidEmail,
    isValidDate: isValidDate,
    isValidTime: isValidTime,
    isValidReservation: isValidReservation,
    isValidWatchmakerName: isValidWatchmakerName,
    isValidCityName: isValidCityName,
    isValidClient: isValidClient,
    isValidPassword: isValidPassword,
    isValidImageFile: isValidImageFile
};