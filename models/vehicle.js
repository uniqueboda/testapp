const mongoose = require('mongoose');

var VehicleSchema = new mongoose.Schema({
    DriverID: {
        type     : mongoose.Schema.Types.ObjectId,
        required : true,
        trim     : true,
        minlength: 1
    },
    RegistrationNo : {
        type     : String,
        required : true,
        trim     : true,
        minlength: 1
    },
    Make: {
        type     : String,
        required : true,
        trim     : true,
        minlength: 1
    },
    Activation: {
        type    : Boolean,
        required: true,
        default : true
    }
});

VehicleSchema.statics.findByDriver = function(did) {
    var Vehicle = this;

    return Vehicle.find({ 'DriverID': did }).then(
        function success(vehicle) {
            if (!vehicle) {
                return Promise.reject();
            }

            return new Promise(function(resolve, failure) {
                resolve(vehicle);
            });
        }
    );
};

VehicleSchema.statics.findByRegistration = function(reg) {
    var Vehicle = this;

    return Vehicle.find({ "Registration": { $regex: reg, $options: 'i' } }).then(
        function success(vehicles) {
            if (!vehicles) {
                return Promise.reject();
            }
            return new Promise(function(resolve, failure) {
                resolve(vehicles);
            });
        },
        function failure(error) {}
    );
};


VehicleSchema.statics.Delete = function(rid) {
    var Vehicle = this;
    return Vehicle.findOneAndRemove({ "_id": rid })
        .then(
            function success(vehicle) {
                if (!vehicle) {
                    return Promise.reject();
                }

                return new Promise(function(resolve, failure) {
                    resolve(vehicle);
                });
            }
        );
};

var Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = { Vehicle };