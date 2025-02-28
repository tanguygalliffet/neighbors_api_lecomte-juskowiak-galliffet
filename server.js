// File: server.js

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let handymen = require('./routes/handymen');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connection MongoDB
const uri = 'mongodb+srv://galliffettpro:pip7MQxnXfebstLC@cluster0.m38oi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connected to MongoDB!");
            console.log("Check http://localhost:8010/api/handymans");
        },
        err => {
            console.log('Connection error: ', err);
        });

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;
const prefix = '/api';

app.route(prefix + '/handymans')
    .get(handymen.getAll)
    .post(handymen.create);

app.route(prefix + '/handymans/:id')
    .get(handymen.getOne)
    .delete(handymen.deleteOne)
    .put(handymen.update);


    app.patch(prefix + '/handymans/:id/favorite', handymen.toggleFavorite);

// Start the server
app.listen(port, "0.0.0.0");
console.log('Server started on http://localhost:' + port);

module.exports = app;
