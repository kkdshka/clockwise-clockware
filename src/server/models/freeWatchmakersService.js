const watchmakersRepository = require('../repositories/watchmakersRepository');

class FreeWatchmakers {
    constructor(params) {
        this.size = params.clockSize;
        this.date = params.date;
        this.startTime = params.time;
        this.city = params.city;
        this.timeToReapir = {
            "small": "01:00",
            "medium": "02:00",
            "large": "03:00"
        }
    }

    get repairingTime() {
        return new Date("1970-01-01" + "T" + this.timeToReapir[this.size]);
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
        return [this.city, this.date, this.startTime, this.finishTime];
    }

    getAll() {
        return watchmakersRepository.getFreeWatchmakers(this.data);
    }
}

module.exports = FreeWatchmakers;