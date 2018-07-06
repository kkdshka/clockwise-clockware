const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const clearingTokens = require('./clearingTokensService');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const index = require('./routes/index');
const watchmakers = require('./routes/watchmakers.js');
const cities = require('./routes/cities.js');
const clients = require('./routes/clients.js');
const reservations = require('./routes/reservations');
const admin = require('./routes/admin');
const login = require('./routes/login');
const logout = require('./routes/logout');
const feedback = require('./routes/feedback');
const adminFeedbacks = require('./routes/adminFeedbacks');
const client = require('./routes/clientAuth');
const personalPage = require('./routes/personalPage');

app.use(express.static(__dirname +'./../../')); //serves the index.html

app.use('/admin/watchmakers', watchmakers);
app.use('/admin/cities', cities);
app.use('/admin/clients', clients);
app.use('/admin/reservations', reservations);
app.use('/admin/feedbacks', adminFeedbacks);
app.use('/admin', admin);
app.use('/login', login);
app.use('/logout', logout);
app.use('/feedback', feedback);
app.use('/client', client);
app.use('/personal-page', personalPage);

app.use('/', index);
const PORT = process.env.PORT || 3000;
app.listen(PORT); //listens on port 3000 -> http://localhost:3000/
