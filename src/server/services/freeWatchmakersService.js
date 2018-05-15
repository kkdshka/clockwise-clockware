const watchmakersRepository = require('../repositories/watchmakersRepository');

class FreeWatchmakers {
    constructor(params) {
        this.size = params.clockSize;
        this.date = params.date;
        this.startTime = params.time;
        this.city_id = params.cityId;
    }

    get repairingTime() {
        if (this.size === 'small') {
            return new Date("1970-01-01T01:00");
        }
        else if (this.size === 'medium') {
            return new Date("1970-01-01T02:00");
        }
        else if (this.size === 'large') {
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
        return {
            city_id: this.city_id,
            date: this.date,
            start_time: this.startTime,
            finish_time: this.finishTime
        };
    }
}

module.exports = FreeWatchmakers;