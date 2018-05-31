const repairingTime = {
    small: 1,
    medium: 2,
    large: 3
};

function getStartTime(startMoment) {
    return startMoment.utc().format();
}

function getFinishTime(startMoment, clockSize) {
    return startMoment.add(repairingTime[clockSize], 'hours').utc().format();
}

module.exports = {
    getStartTime: getStartTime,
    getFinishTime: getFinishTime
};