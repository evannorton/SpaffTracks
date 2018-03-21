import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <Link to="/" id="logo-link">
                            <img id="logo" src="/images/SpaffTracks.png" alt="SpaffTracks" />
                        </Link>
                    </div>
                </div>
            </header >
        );
    }
}