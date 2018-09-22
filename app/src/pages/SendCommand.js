import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001';

export default class SendCommand extends Component {
    consructor(props) {
        super(props)
        this.state = {
            deviceId: '',
            command: ''
        }
        this.sendCommand = this.sendCommand.bind(this);
        this.onCommandChange = this.onCommandChange.bind(this);
        this.onDeviceIdChange = this.onDeviceIdChange.bind(this);
    }
    
    onDeviceIdChange(e) {
        this.setState({deviceId: e.target.value})
    }

    onCommandChange(e) {
        this.setState({deviceId: e.target.value})
    }

    sendCommand() {
        const deviceId = this.state.deviceId;
        const command = this.state.command;
        const body = {
            deviceId,
            command
        };
        axios.post(`${MQTT_URL}/send-command`, body);
    }
    
    render() {
        return (
            <div>
                <h1>Send Command</h1>
                <div className="form-group">
                    <label htmlFor="device-id">Device ID</label>
                    <input type="text" className="form-control" value={this.state.deviceId} onChange={this.onDeviceIdChange}></input>
                    <label htmlFor="command">Command</label>
                    <textarea rows="2" className="form-control" value={this.state.command} onChange={this.onCommandChange}></textarea>
                </div>
                <button className="btn btn-success" onClick={this.sendCommand}>Send</button>
            </div>
        );
    }
}