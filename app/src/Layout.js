// Modules
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Pages
import AboutMe from './pages/AboutMe';
import DeviceList from './pages/DeviceList';
import Err404 from './pages/Err404';
import Login from './pages/Login';
import RegisterDevice from './pages/RegisterDevice';
import Registration from './pages/Registration';
import SendCommand from './pages/SendCommand';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import history from './history';

const API_URL = 'http://localhost:5000/api';

export default class Layout extends Component {
    constructor() {
        super()
        this.state={
            user: null,
            isAdmin: false,
            devices: null,
        }
    }

    setUser(user, isAdmin) {
        this.setState({
            user: user,
            isAdmin: isAdmin
        })
        this.updateDevices();
    }

    updateDevices() {
        if (this.state.user) {
            axios.get(`${API_URL}/users/${this.state.user}/devices`)
                .then(response => {
                    this.setState({devices: response.data});
                    console.log(this.state.devices);                    
                });
        }
    }

    render() {
        return (
            <BrowserRouter history={history}>
                <div className='container'>
                    <Navigation user={this.state.user} setUser={this.setUser.bind(this)}/>
                    <Switch>
                        <Route exact path='/' component={DeviceList} />
                        <Route path='/about-me' component={AboutMe} />
                        <Route path='/device-list' render={() => <DeviceList devices={this.state.devices} /> } />
                        <Route path='/login' render={() => <Login user={this.state.user} isAdmin={this.state.isAdmin} setUser={this.setUser.bind(this)}/> } />
                        <Route path='/register-device' render={() => <RegisterDevice devices={this.state.devices} updateDevices={this.updateDevices.bind(this)}/> } />
                        <Route path='/registration' component={Registration} />
                        <Route path='/send-command' component={SendCommand} />
                        <Route component={Err404} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}