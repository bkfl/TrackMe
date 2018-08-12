const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const { API_URL } = process.env;

test('test device array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices`)
        .then (resp => resp.data)
        .then(resp => {
            expect(resp[0].user).toEqual('mary123');
        });
});

test('test adding new device', () => {
    expect.assertions(1);
    data = {
        name: "test device",
        user: "test user",
        sensorData: {}
        };
    return axios.post(`${API_URL}/devices`, data)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp).toEqual("Successfully added device and data");
        });
});

test('test single user device list', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/users/mary123/devices`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].name).toEqual('Mary\'s iPhone');
        });
});

test('test device history', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices/5b55096010fa107a6a063b2e/device-history`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].ts).toEqual('1529542230');
        });
})

test('test login', () => {
    expect.assertions(1);
    data = {
        user: "alex",
        password: "alex"
    };
    return axios.post(`${API_URL}/authenticate`, data)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp.success).toEqual(true);
        });
})