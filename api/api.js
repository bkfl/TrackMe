const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, useNewUrlParser: true });

const Device = require('./models/device');
const User = require('./models/user');

var bodyParser = require('body-parser');

// Parse body data using body-parser package
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Add header to allow multiple response origins
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        return err
            ? res.send(err)
            : res.send(devices);
    });
});

app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    });
});

app.get('/api/users/:user/devices', (req, res) => {
    const { user } = req.params;
    Device.find({ "user": user }, (err, devices) => {
        return err
            ? res.send(err)
            : res.send(devices);
    });
});

app.post('/api/send-command', (req, res) => {
    console.log(req.body.command);
});

app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    User.findOne({ 'user': user }, (err, found) => {
        if (err) {
            return res.send(err)
        } else if (!found || password != found.password) {
            return res.json({
                success: false,
                message: 'Incorrect username or password',
                isAdmin: false
            })
        } else {
            return res.json({
                success: true,
                message: 'Authenticated successfully',
                isAdmin: found.isAdmin
            });
        }
    });
});

app.post('/api/register', (req, res) => {
    const { user, password, isAdmin } = req.body;
    User.findOne({ 'user': user }, (err, found) => {
        if (err) {
            return res.send(err);
        } else if (found) {
            return res.json({
                success: false,
                message: 'User already exists'
            });
        } else {
            const newUser = new User({
                user,
                password,
                isAdmin
            });
            newUser.save(err => {
                return err
                    ? res.send(err)
                    : res.json({
                        success: true,
                        message: 'Created new user'
                    })
            })
        }
    });
});

app.get('/api/devices/:deviceId/device-history', (req, res) => {
    const { deviceId } = req.params;
    Device.findOne({ '_id': deviceId }, (err, device) => {
        const { sensorData } = device;
        return err
            ? res.send(err)
            : res.send(sensorData);
    });
});

// Start listening
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});