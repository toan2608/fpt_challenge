const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let DataSensor = new Schema({
    topic: {
        type: String
    },
    time: {
        type: Number
    },
    PM25: Number,
    PM10: Number,
    PM1: Number,
    Temperature: Number,
    Humidity: Number,
    Pressure: Number,
    UV: Number,
    Battery: Number,
});

// Export the model
module.exports = mongoose.model('sensor', DataSensor);