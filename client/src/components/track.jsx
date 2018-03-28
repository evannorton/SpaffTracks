import React, { Component } from 'react';

export default class Show extends Component {
    render() {
        return (
            <div
                className="col-12 track bubble-tile d-flex align-items-center justify-content-center"
                onClick={() => { this.props.setClickedTrack(this.props.track) }}
            >
                {this.props.track.title}
            </div>
        );
    }
}