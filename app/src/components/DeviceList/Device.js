import React, { Component } from 'react';

export default class Device extends Component {
    render() {
        return (
            <div>
                <h1>Device History</h1>
                <table id="device-history">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Device</th>
                            <th>Location</th>
                            <th>Temperature</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        );
    }
}