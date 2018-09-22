// Modules
import React, { Component } from 'react';
import axios from 'axios';

export default class DeviceList extends Component {

    render() {
        return (
            <div>
                <h1>Devices</h1>
                <table id="devices">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.devices ? 
                        this.props.devices.map((device) => {
                            return <tr key={device.id}>
                                        <td>{device.user}</td>
                                        <td>{device.name}</td>
                                    </tr>
                        }) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}