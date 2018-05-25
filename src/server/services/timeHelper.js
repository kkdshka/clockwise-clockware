const moment = require('moment-timezone');

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

const repairingTime = {
    small: 1,
    medium: 2,
    large: 3
};

function getFinishTime(startTime, clock_size) {
    return moment(new Date(startTime)).add(repairingTime[clock_size], 'hours').format();
}

module.exports = {
    getFinishTime: getFinishTime
};