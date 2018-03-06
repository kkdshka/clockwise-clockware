var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//var migrations = require('./migrations');
//migrations.createTable();

var index = require('./routes/index');
var watchmakers = require('./routes/watchmakers.js');

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

// app.use('/', index);
app.use('/admin/watchmakers', watchmakers);

let handler = (req, res) => res.sendFile(path.join(__dirname, "../../index.html"));
let routes = ["/", "/admin", "/admin/watchmakers", "/admin/cities", "/admin/clients", "/admin/reservations"];
routes.forEach( route => app.get(route, handler) );