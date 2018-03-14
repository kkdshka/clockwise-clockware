class Reservation {
    constructor(name, city, email, clockSize, date, time, watchmakerId, id) {
        this.name = name;
        this.city = city;
        this.email = email;
        this.clockSize = clockSize;
        this.date = date;
        this.time = time;
        this.id = id;
        this.watchmakerId = watchmakerId;
    }
}

module.exports = Reservation;