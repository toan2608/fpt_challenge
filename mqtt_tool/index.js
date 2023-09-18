const mqtt = require('mqtt');
const {CronJob: cronJob} = require("cron");
const { appConstant } = require('./constant');
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
client.on('connect', () => {
  console.log('Connected')
//   client.subscribe([topic], () => {
//     console.log(`Subscribe to topic '${topic}'`)
//   })

//   client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//     if (error) {
//       console.error(error)
//     }
//   })
})

new cronJob(
    appConstant.EVERY_10S,
    function () {
        console.log('==job 10s start==')
        const time = new Date();
        const timeStamp = Math.floor(time.getTime()/1000);
        const stationIdFirst = 'test1'
        client.publish( topic, JSON.stringify({
            stationID: stationIdFirst,
            time: timeStamp,
            Temperature: Math.random() * 40,
            Humidity: Math.random() * 100,
            Pressure: Math.random() * 1000,
            PM1: Math.random() * 654,
            PM25: Math.random() * 500.4,
            PM10: Math.random() * 604,
            UV: Math.random() * 2000,
            Battery: Math.random() * 100,
        }))
        const stationIdSecond = 'test2'
        client.publish( topic, JSON.stringify({
            stationID: stationIdSecond,
            time: timeStamp,
            Temperature: Math.random() * 40,
            Humidity: Math.random() * 100,
            Pressure: Math.random() * 1000,
            PM1: Math.random() * 654,
            PM25: Math.random() * 500.4,
            PM10: Math.random() * 604,
            UV: Math.random() * 2000,
            Battery: Math.random() * 100,
        }))
    },
    null,  // cb when job stop
    true,  // auto start
)

