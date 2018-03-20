import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <header className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <img id="logo" width="25%" src="/images/SpaffTracks.png" alt="SpaffTracks" />
                    </div>
                </div>
            </header>
        );
    }
}