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

function isValidTime(time) {
    return new Date('1970-01-01T' + time) > new Date('1970-01-01T08:59') && new Date('1970-01-01T' + time) < new Date('1970-01-01T18:01');
}

function isValidReservation(params) {
    return isValidTime(params.time) && isValidName(params.name) && isValidEmail(params.email) && isValidDate(params.date);
}

module.exports = {
    isValidName: isValidName,
    isValidEmail: isValidEmail,
    isValidDate: isValidDate,
    isValidTime: isValidTime,
    isValidReservation: isValidReservation
};