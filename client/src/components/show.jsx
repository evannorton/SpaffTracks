import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Show extends Component {
    render() {
        return (
            <Link to={`/show/${this.props.show.date}`} id="show" className="col-12 bubble-tile d-flex align-items-center justify-content-center">
                {this.props.show.date}
            </Link>
        );
    }
}