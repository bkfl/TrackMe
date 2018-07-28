const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, useNewUrlParser: true });

const Device = require('./models/device');
const User = require('./models/user');

var bodyParser = require('body-parser');

// Parse body using body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add header to allow multiple response origins
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
    next();
});

/**
 * @api {get} /api/devices Request array of all devices
 * @apiGroup Device
 *
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *          "_id": "dsohsdohsdofhsofhosfhsofh",
 *          "name": "Mary's iPhone",
 *          "user": "mary",
 *          "sensorData": [
 *              {
 *                  "ts": "1529542230",
 *                  "temp": 12,
 *                  "loc": {
 *                      "lat": -37.84674,
 *                      "lon": 145.115113
 *                  }
 *              },
 *              {
 *                  "ts": "1529572230",
 *                  "temp": 17,
 *                  "loc": {
 *                      "lat": -37.850026,
 *                      "lon": 145.117683
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * 
 * @apiError {String} err API error message
 */

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        return err
            ? res.send(err)
            : res.send(devices);
    });
});

/**
 * @api {post} /api/devices Add a new device
 * @apiGroup Device
 * 
 * @apiParam {String} name Device name
 * @apiParam {String} user Device owner
 * @apiParam {Array} sensorData Array of device sensor data
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "Successfully added device and data"
 *  }
 * 
 * @apiError {String} err API error message
 */

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
            : res.send('Successfully added device and data');
    });
});

/**
 * @api {get} /api/users/:user/devices Request array of devices for single user
 * @apiGroup Device
 *
 * @apiParam {string} :user User id
 * 
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *          "_id": "dsohsdohsdofhsofhosfhsofh",
 *          "name": "Mary's iPhone",
 *          "user": "mary",
 *          "sensorData": [
 *              {
 *                  "ts": "1529542230",
 *                  "temp": 12,
 *                  "loc": {
 *                      "lat": -37.84674,
 *                      "lon": 145.115113
 *                  }
 *              },
 *              {
 *                  "ts": "1529572230",
 *                  "temp": 17,
 *                  "loc": {
 *                      "lat": -37.850026,
 *                      "lon": 145.117683
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * 
 * @apiError {String} err API error message
 */

app.get('/api/users/:user/devices', (req, res) => {
    const { user } = req.params;
    Device.find({ "user": user }, (err, devices) => {
        return err
            ? res.send(err)
            : res.send(devices);
    });
});

/**
 * @api {get} /api/devices/:deviceId/device-history Request array of sensor data for single device
 * @apiGroup Device
 * 
 * @apiParam :deviceId Device id
 * 
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *          "ts": "1529542230",
 *          "temp": 12,
 *          "loc": {
 *            "lat": -37.84674,
 *            "lon": 145.115113
 *           }
 *      },
 *      {
 *          "ts": "1529572230",
 *          "temp": 17,
 *          "loc": {
 *              "lat": -37.850026,
 *              "lon": 145.117683
 *          }
 *      }
 *  ]
 * 
 * @apiError {String} err API error message
 */

app.get('/api/devices/:deviceId/device-history', (req, res) => {
    const { deviceId } = req.params;
    Device.findOne({ '_id': deviceId }, (err, device) => {
        const { sensorData } = device;
        return err
            ? res.send(err)
            : res.send(sensorData);
    });
});

/**
 * @api {post} /api/authenticate Authenticate user credentials
 * @apiGroup User
 * 
 * @apiParam {String} user User's name / login
 * @apiParam {String} password User's password
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      success: true,
 *      message: 'Authenticated successfully',
 *      isAdmin: (true | false)
 *  }
 * 
 * @apiErrorExample {json} Error-Response:
 *  {
 *      success: false,
 *      message: 'Incorrect username or password',
 *      isAdmin: false
 *  }
 * 
 * @apiError {String} err API error message
 */

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

/**
 * @api {post} /api/register Create new user
 * @apiGroup User
 * 
 * @apiParam {String} user User's name / login
 * @apiParam {String} password User's password
 * @apiParam {Boolean} isAdmin Is the user an administrator?
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      success: true,
 *      message: 'Created new user'
 *  }
 * 
 * @apiErrorExample {json} Error-Response:
 *  {
 *      success: false,
 *      message: 'User already exists'
 *  }
 * 
 * @apiError {String} err API error message
 */

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

app.use(express.static(`${__dirname}/public`));
app.get('/docs', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

// Start listening
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});