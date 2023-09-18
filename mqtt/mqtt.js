const mqtt = require('mqtt');
require('dotenv').config();
const host = 'broker.hivemq.com';
const port = 1883;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
})
const topic = 'iot_challenge'
const DataSensor = require('./model/dataSensor.model');


client.on('connect', () => {
  console.log('Connected')
})
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/iot_challenge', {useNewUrlParser: true}).then(()=>console.log('Connect Successfully!'));
client.on('message',async function (topic, message) {
    // called each time a message is received
    
    message = JSON.parse(message.toString('utf-8'));
    console.log('Received message:', message);
    const dataSave = {
      topic: 'sensor/' + message.stationID,
      time:message.time,
      PM25:message.PM25,
      PM10: message.PM10,
      PM1:message.PM1,
      Temperature:message.Temperature,
      Humidity:message.Humidity,
      Pressure:message.Pressure,
      UV: message.UV,
      Battery: message.Battery,
    };
    const dataSensor = new DataSensor(dataSave);
    // console.log(dataSave);
    await dataSensor.save()
    
});

// subscribe to topic 'iot_challenge'
client.subscribe(topic);
