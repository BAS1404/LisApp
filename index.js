// server.js
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require("./libs/mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require("path");

app.set('port', process.env.PORT | config.get('port'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('files'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});
var routes = require('./routes/all_routes')(app);
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};
    res.status(err.status || 500);
    res.send('error');
});

app.listen(app.get('port'), () => {
    console.log('We are live on ' + app.get('port'));
});
