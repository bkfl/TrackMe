import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

import history from '../history';

const API_URL = 'http://localhost:5000/api';

export default class Login extends Component {
    constructor(props) {
        super (props);
        this.state = {
            username: '',
            password: '',
            err: false,
            errMessage: ''
        }
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.login = this.login.bind(this);
    }

    usernameChange(e) {
        this.setState({username: e.target.value});
    }

    passwordChange(e) {
        this.setState({password: e.target.value});
    }

    login() {
        const user = this.state.username;
        const password = this.state.password;
        axios.post(`${API_URL}/authenticate`, { user, password })
            .then(response => {
                response = response.data;
                if (response.success) {
                    this.props.setUser(user, response.isAdmin);
                    history.push('/');
                } else {
                    console.log(response);
                    this.setState({
                        error: true,
                        message: response.message,
                    });
                }
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }

    render() {
        const errorDiv = <p className="alert alert-danger">{this.state.message}</p>;

        return (
            <div>
                <h1>Login</h1>
                {this.state.error ? errorDiv : null}
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.usernameChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.passwordChange} />
                </div>
                <button className="btn btn-success" id="login" onClick={this.login}>Login</button>
                <p>Don't have an account? Register <NavLink to="/registration">here</NavLink>.</p>
            </div>
        );
    }
}