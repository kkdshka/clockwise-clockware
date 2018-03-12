const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const migrations = require('./migrations');
// migrations.createWatchmakersTable();
// migrations.createCitiesTable();
// migrations.createClientsTable();

const index = require('./routes/index');
const watchmakers = require('./routes/watchmakers.js');
const cities = require('./routes/cities.js');
const clients = require('./routes/clients.js')

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

app.use('/admin/clients', clients);
app.use('/admin/watchmakers', watchmakers);
app.use('/admin/cities', cities);
app.use('/', index);
