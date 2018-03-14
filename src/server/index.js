const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const index = require('./routes/index');
const watchmakers = require('./routes/watchmakers.js');
const cities = require('./routes/cities.js');
const clients = require('./routes/clients.js');
const reservations = require('./routes/reservations');

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

app.use('/admin/watchmakers', watchmakers);
app.use('/admin/cities', cities);
app.use('/admin/clients', clients);
app.use('/admin/reservations', reservations);
app.use('./admin', index);
app.use('/', index);
