import React, { Component } from 'react';

export default class Show extends Component {
    render() {
        return (
            <div className="track" className="col-12 bubble-tile d-flex align-items-center justify-content-center">
                {this.props.track.title}
            </div>
        );
    }
}