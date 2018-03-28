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
            icon: faPlayCircle,
            trackerPosition: 0
        }
        this.audio;
        this.tracker;
    }

    componentDidMount() {
        this.audio = $("audio")[0];
        this.audio.ontimeupdate = () => { this.moveTracker() };
        this.audio.onended = () => { this.setState({ icon: faPlayCircle }); };
        this.audio.onplay = () => { this.setState({ icon: faPauseCircle }); };
        this.audio.onpause = () => { this.setState({ icon: faPlayCircle }); };
        this.tracker = $("#tracker");
    }

    componentWillReceiveProps(props) {
        if (props.wasClicked) {
            this.playTrack(props.clickedTrack);
        }
    }

    async playTrack(track) {
        await this.setState({ currentTrack: track })
        this.audio.currentTime = 0;
        this.audio.play();
    }

    moveTracker() {
        let currentProgress = this.audio.currentTime / this.audio.duration;
        let lineWidth = ($("#audio-line").css("width"));
        lineWidth = parseInt(lineWidth.substring(0, lineWidth.length - 2));
        let currentPosition = currentProgress * lineWidth;
        currentPosition = currentPosition + 136;
        this.tracker.css("margin-left", `${currentPosition}px`)
    }

    renderTrackInfo() {
        if (this.state.currentTrack.title) {
            return (
                <div id="track-info">
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
                <div id="buttons" className="d-flex align-items-center">
                    <FontAwesomeIcon
                        className="direction-button"
                        icon={faBackward}
                    />
                    <FontAwesomeIcon
                        className="play-button"
                        icon={this.state.icon}
                        onClick={() => {
                            if (this.audio.paused) {
                                this.audio.play();
                            } else {
                                this.audio.pause();
                            }
                        }}
                    />
                    <FontAwesomeIcon
                        className="direction-button"
                        icon={faForward}
                    />
                </div>
                {this.renderTrackInfo()}
                <div id="audio-line"></div>
                <div id="tracker"></div>
            </div >
        );
    }

}