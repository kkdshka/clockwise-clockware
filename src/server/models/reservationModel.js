class Reservation {
    constructor(name, city, email, clockSize, date, id) {
        this.name = name;
        this.city = city;
        this.email = email;
        this.clockSize = clockSize;
        this.date = date;
        this.id = id;
    }
}

module.exports = Reservation;