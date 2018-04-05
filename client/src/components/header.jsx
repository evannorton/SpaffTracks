import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    renderHeaderInfo() {
        if (this.props.page === "shows") {
            return (
                <h1>{this.props.year}</h1>
            );
        } else if (this.props.page === "tracks") {
            return (
                <div>
                    <h1 id="header-date">{this.props.date}</h1>
                    <a target="_blank" href={this.props.spaffnerds}>Setlist: Spaffnerds.com</a>
                </div>
            );
        } else {
            return (
                <Link to="/" id="logo-link">
                    <img id="logo" src="/images/SpaffTracks.png" alt="SpaffTracks" />
                </Link>
            );
        }
    }

    render() {
        return (
            <header className="container-fluid d-flex align-items-center justify-content-center">
                {this.renderHeaderInfo()}
            </header >
        );
    }

}