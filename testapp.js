var express = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var path       = require('path');

var { mongoose } = require('./db/mongoose');

//var { authenticate } = require('./middleware/authenticate');

var vehicleroutes = require('./routes/vehicleroutes');


var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth, Content-disposition");
    res.header("Access-Control-Expose-Headers", "x-auth, Content-Disposition");
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/uniqueboda/testapp", vehicleroutes);


app.listen(50000, function() {
    console.log("Server running on port 50000");
});