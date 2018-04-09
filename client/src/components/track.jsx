import React, { Component } from 'react';

export default class Show extends Component {

    componentDidMount() {
        let audio = $("#audio-" + this.props.track.id)[0];
        let duration = $("#duration-" + this.props.track.id);
        if (audio) {
            audio.ondurationchange = () => {
                let durationMinutes = Math.floor(audio.duration / 60).toString();
                let durationSeconds = Math.floor(audio.duration % 60).toString();
                if (durationSeconds.length === 1) {
                    durationSeconds = "0" + durationSeconds;
                }
                duration.text(durationMinutes + ":" + durationSeconds);
            };
        }
    }

    render() {
        return (
            <div
                className="col-12 track bubble-tile d-flex align-items-center justify-content-left"
                onClick={() => { this.props.setClickedTrack(this.props.track) }}
            >
                <audio id={"audio-" + this.props.track.id} src={this.props.track.url} type="audio/mp3"></audio>
                <p>
                    {this.props.track.title}
                </p>

                <span className="duration" id={"duration-" + this.props.track.id}>
                </span>
            </div>
        );
    }

}