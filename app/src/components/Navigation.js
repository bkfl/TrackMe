import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import history from '../history';

class Navigation extends React.Component {
    logout(e) {
        this.props.setUser(null, false)
        history.push('/login');
    }

    render() {
        const logoutNavLink = <a className="nav-item nav-link" onClick={this.logout.bind(this)}>Logout</a>
        const loginNavLink = <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
        const isAuthenticated = this.props.user;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">TrackMe</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#expanded-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="expanded-nav">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link" to="/">Devices</NavLink>
                            <NavLink className="nav-item nav-link" to="/register-device">Register Device</NavLink>
                            <NavLink className="nav-item nav-link" to="/send-command">Send Command</NavLink>
                            <NavLink className="nav-item nav-link" to="/about-me">About Me</NavLink>
                            { isAuthenticated ? logoutNavLink : loginNavLink }
                        </div>
                    </div>
                </nav>
                
            </div>
        );
    }
}

export default Navigation;