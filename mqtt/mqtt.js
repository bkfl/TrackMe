const { URL, USER, PASSWORD } = process.env;
const port = process.env.PORT || 5001;

const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/device');
const User = require('./models/user');
const randomCoordinates = require('random-coordinates');
const rand = require('random-int');

mongoose.connect(process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, useNewUrlParser: true });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = mqtt.connect(URL, {
    username: USER,
    password: PASSWORD
});

client.on('connect', () => {
    client.subscribe('/sensorData');
});

client.on('message', (topic, message) => {
    if (topic == '/sensorData') {
        const data = JSON.parse(message);
        
        Device.findOne({"name": data.deviceId}, (err, device) => {
            if (err) {
                console.log(err);
            }

            const {sensorData} = device;
            const {ts, loc, temp} = data;

            sensorData.push({ts, loc, temp});
            device.sensorData = sensorData;

            device.save(err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
});

/**
 * @api {post} /send-command Send command to a device
 * @apiGroup Device
 * 
 * @apiParam {String} deviceId Device name
 * @apiParam {String} command Command to send
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *      "deviceId": "Alex's iPhone",
 *      "command": "send-gps-location"
 *  }
 * 
 * @apiSuccessExample {String} Success-Response:
 *  "published new message"
 */

app.post('/send-command', (req, res) => {
    const { deviceId, command } = req.body;
    const topic = `/command/${deviceId}`;
    client.publish(topic, command, () => {
        res.send('published new message');
    });
});

/**
 * @api {put} /sensor-data Add sensor data to device
 * @apiGroup Device
 * 
 * @apiParam {String} deviceId Device name
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *      "deviceId": "Alex's iPhone"
 *  }
 * 
 * @apiSuccessExample {String} Success-Response:
 *  "published new message"
 * 
 * @apiError {String} err API error message
 */

app.put('/sensor-data', (req, res) => {
    const { deviceId } = req.body;

    const [lat, lon] = randomCoordinates().split(", ");
    const ts = new Date().getTime();
    const loc = { lat, lon };
    const temp = rand(20, 50);

    const topic = '/sensorData';
    const message = JSON.stringify({ deviceId, ts, loc, temp});

    client.publish(topic, message, () => {
        res.send('published new message');
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});