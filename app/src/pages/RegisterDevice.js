import React, { Component } from 'react';
import axios from 'axios';

import history from '../history';

const API_URL = 'http://localhost:5000/api';

export default class RegisterDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            user: ''
        }
        this.nameChanged = this.nameChanged.bind(this);
        this.userChanged = this.userChanged.bind(this);
    }

    nameChanged(e) {
        this.setState({name: e.target.value});
    }

    userChanged(e) {
        this.setState({user: e.target.value});
    }

    registerDevice() {
        const name = this.state.name;
        const user = this.state.user;
        const sensorData = [];
        const body = {
            name,
            user,
            sensorData
        };
        axios.post(`${API_URL}/devices`, body)
            .then(response => {
                this.props.updateDevices();
                history.push('/');
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }

    render() {
        return (
            <div>
                <h1>Register New Device</h1>
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <input type="text" className="form-control" value={this.state.user} onChange={this.userChanged}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Device Name</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.nameChanged} />
                </div>
                <button className="btn btn-success" id="add-device" onClick={this.registerDevice()}>Save</button>
            </div>
        );
    }
}