class Reservation {
    constructor(name, city, email, clockSize, date, time, watchmaker, id) {
        this.name = name;
        this.city = city;
        this.email = email;
        this.clockSize = clockSize;
        this.date = date;
        this.time = time;
        this.watchmaker = watchmaker;
        this.id = id;
    }
}

module.exports = Reservation;