import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Year extends Component {
    render() {
        return (
            <Link to={`/year/${this.props.year}`} id="year" className="col-12 bubble-tile d-flex align-items-center justify-content-center">
                {this.props.year}
            </Link>
        );
    }
}