function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function getRepairingTime(clock_size) {
    console.log(clock_size);
    if (clock_size === 'small') {
        return new Date("1970-01-01T01:00");
    }
    else if (clock_size === 'medium') {
        return new Date("1970-01-01T02:00");
    }
    else if (clock_size === 'large') {
        return new Date("1970-01-01T03:00");
    }
}

function getFinishTime(time, clock_size) {
    const startDate = new Date("2018-04-03T" + time);
    return pad(startDate.getHours() + getRepairingTime(clock_size).getHours()) + ':00';
}

module.exports = {
    getFinishTime: getFinishTime
};