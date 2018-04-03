const watchmakersRepository = require('../repositories/watchmakersRepository');

class FreeWatchmakers {
    constructor(params) {
        this.size = params.clockSize;
        this.date = params.date;
        this.startTime = params.time;
        this.city = params.city;
    }

    get repairingTime() {
        if (this.size === 'Маленькие') {
            return new Date("1970-01-01T01:00");
        }
        else if (this.size === 'Средние') {
            return new Date("1970-01-01T02:00");
        }
        else if (this.size === 'Большие') {
            return new Date("1970-01-01T03:00");
        }
    }

    get finishTime() {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        const startDate = new Date(this.date + "T" + this.startTime);
        return pad(startDate.getHours() + this.repairingTime.getHours()) + ':00';
    }

    get data() {
        return [this.city, this.city, this.date, this.startTime, this.finishTime, this.finishTime, this.startTime, this.startTime, this.finishTime];
    }
}

module.exports = FreeWatchmakers;