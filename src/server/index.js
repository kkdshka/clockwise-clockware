const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));
app.use(cookieParser());

const index = require('./routes/index');
const watchmakers = require('./routes/watchmakers.js');
const cities = require('./routes/cities.js');
const clients = require('./routes/clients.js');
const reservations = require('./routes/reservations');
const admin = require('./routes/admin');
const login = require('./routes/login');
const logout = require('./routes/logout');

app.use(express.static(__dirname +'./../../')); //serves the index.html

app.use('/admin/watchmakers', watchmakers);
app.use('/admin/cities', cities);
app.use('/admin/clients', clients);
app.use('/admin/reservations', reservations);
app.use('/admin', admin);
app.use('/login', login);
app.use('/logout', logout);

app.use('/', index);
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
