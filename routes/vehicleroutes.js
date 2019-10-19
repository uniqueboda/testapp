const express = require('express');
var router   = express.Router();
var mongoose = require('mongoose');

var { Vehicle } = require('../models/vehicle');
//var { authenticate } = require('./../middleware/authenticate');

// record a new vehicle
router.post('/register', /*authenticate,*/ function(req, res) {
    console.log(req.body);
    var vehicle = new Vehicle({
        RegistrationNo: req.body.Rating,
        DriverID      : req.body.SubmissionID,
        Make          : req.body.Make
    });

    vehicle.save().then(
        function success(vehicle) {
            res.send(vehicle);
        },
        function failure(error) {
            res.status(400);
            res.send(error);
        }
    );

});

// retrieving vehicle by driver ID
router.post('/driver', /*authenticate,*/ function(req, res) {
    var did = req.body.DriverID;

    console.log("In driver: " + req.body);

    Vehicle.find({ DriverID: did }).then(
        function success(vehicle) {
            res.send(vehicle);
        },
        function failure(error) {
            res.send(error);
        }
    );
});

// retrieving vehicle by registration
router.post('/registration', /*authenticate,*/ function(req, res) {
    var reg = req.body.Registration;

    console.log("In registration: " + req.body);

    Vehicle.find({ "Registration": { $regex: reg, $options: 'i' } }).then(
        function success(vehicles) {
            res.send(vehicles);
        },
        function failure(error) {
            res.send(error);
        }
    );
});

// update vehicle status (active or inactive)
router.post('/state', /*authenticate,*/ function(req, res) {
    var state = req.body.State;
    var vid   = req.body.VehicleID;

    console.log("in state: " + req.body);
    
    let newVehicle;
    
    Vehicle.find({ "_id": vid }).then(
        function success(v) {
        
            newVehicle = new Vehicle({
                DriverID      : v.DriverID,
                RegistrationNo: v.RegistrationNo,
                Make          : v.Make,
                Activation    : state
            })
            
            Vehicle.findByIdAndRemove({"_id": v._id})
            .then(
                newVehicle.save().then(
                    function success(vehicle) {
                        res.send(vehicle);
                    },
                    function failure(error) {
                        res.status(400);
                        res.send(error);
                    }
                )
            )
        },
        function failure(error) {
            res.send(error);
        }
    );

});

module.exports = router;