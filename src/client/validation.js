const moment = require('moment');

function validate(fieldName, currentElement, value, setStateCallback) {
    switch (fieldName) {

        case "name":
        case "enName":
        case "ruName":
            if (isValidName(value)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;

        case "password":
        case "repeatPassword":
            if (isValidPassword(value)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;

        case "email":
            if (isValidEmail(value)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;

        case "date":
            if (isValidDate(value)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;

        case "time":
            if (isValidTime(value.time, value.date, value.timezone)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;

        case "avatar":
            if (isValidImageFile(value)) {
                currentElement.className = 'form-control form-control-sm is-valid';
                setStateCallback(true);
            } else {
                currentElement.className = 'form-control form-control-sm is-invalid';
                return setStateCallback(false);
            }
            break;
    }
}

function isValidData(validationResult) {
    let res = true;
    for (let propertyName in validationResult) {
        if (!validationResult[propertyName].isValid) {
            return res = false;
        }
    }
    return res;
}

function isValidName(name) {
    return name.length > 1;
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

function isValidTime(time, date, timezone) {
    if(!time || !date || !timezone) {
        return false;
    }
    const reservationDate = moment(date);
    const reservationTime = moment.tz(date + "T" + time, timezone);
    if (reservationDate.isSame(moment(), 'day')) {
        return reservationTime.isAfter(moment.tz(timezone)) && reservationTime.isBefore(moment.tz(date + "T" + "18:01", timezone));
    }
    return reservationTime.isAfter(moment(date + "T" + "08:59", timezone)) && reservationTime.isBefore(moment(date + "T" + "18:01", timezone));
}

function isValidImageFile(file) {
    const validExtentions = ['jpg', 'jpeg', 'png'];
    const splitFile = file.split('.');
    const fileExtention = splitFile[(splitFile.length - 1)];
    return validExtentions.indexOf(fileExtention) >= 0;
}

function isValidPassword(password) {
    return password.length > 7;
}

module.exports = {
    validate: validate,
    isValidData: isValidData,
    isValidName: isValidName,
    isValidEmail: isValidEmail,
    isValidDate: isValidDate,
    isValidTime: isValidTime,
    isValidPassword: isValidPassword,
    isValidImageFile: isValidImageFile
};