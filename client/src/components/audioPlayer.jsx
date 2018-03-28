import React, { Component } from "react";
import "babel-polyfill";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlayCircle from "@fortawesome/fontawesome-free-solid/faPlayCircle";
import faPauseCircle from "@fortawesome/fontawesome-free-solid/faPauseCircle";
import faForward from "@fortawesome/fontawesome-free-solid/faForward";
import faBackward from "@fortawesome/fontawesome-free-solid/faBackward";

export default class AudioPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrack: {
                url: "",
                title: "",
                date: "",
                venue: "",
                city: ""
            },
            icon: faPlayCircle
        }
        this.audio;
    }

    componentDidMount() {
        this.audio = $("audio")[0];
    }

    componentWillReceiveProps(props) {
        if (props.wasClicked) {
            this.playTrack(props.clickedTrack);
        }
    }

    async playTrack(track) {
        await this.setState({ currentTrack: track })
        this.setState({ icon: faPauseCircle });
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pauseTrack() {
        this.setState({ icon: faPlayCircle });
        this.audio.pause();
    }

    resumeTrack() {
        this.setState({ icon: faPauseCircle });
        this.audio.play();
    }

    renderTrackInfo() {
        if (this.state.currentTrack.title) {
            return (
                <div>
                    <span id="current-track-title">{this.state.currentTrack.title}</span>
                    <span id="current-track-date">{this.state.currentTrack.venue} - {this.state.currentTrack.city}, {this.state.currentTrack.date}</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div id="audio-player" className="d-flex container-fluid align-items-center">
                <audio
                    src={this.state.currentTrack.url}
                    type="audio/ogg"
                />
                <FontAwesomeIcon
                    className="direction-button"
                    icon={faBackward}
                />
                <FontAwesomeIcon
                    className="play-button"
                    icon={this.state.icon}
                    onClick={() => {
                        if (this.audio.paused) {
                            this.resumeTrack();
                        } else {
                            this.pauseTrack();
                        }
                    }}
                />
                <FontAwesomeIcon
                    className="direction-button"
                    icon={faForward}
                />
                {this.renderTrackInfo()}
            </div >
        );
    }

}