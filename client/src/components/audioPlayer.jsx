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
            tracks: [],
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
        this.audio.onended = () => { this.playNextTrack() };
        this.audio.onplay = () => { this.setState({ icon: faPauseCircle }); };
        this.audio.onpause = () => { this.setState({ icon: faPlayCircle }); };
        this.tracker = $("#tracker");
    }

    componentWillReceiveProps(props) {
        this.setState({ tracks: props.tracks });
        if (props.wasClicked) {
            this.playTrack(props.clickedTrack);
        }
    }

    async playTrack(track) {
        await this.setState({ currentTrack: track })
        this.audio.currentTime = 0;
        this.audio.play();
    }

    async playNextTrack() {
        let tracks = this.state.tracks;
        let currentTrack = this.state.currentTrack;
        let set = currentTrack.set;
        let position = currentTrack.position;
        let newTrack;
        if (set === "1") {
            tracks.set1.forEach((track) => {
                if (track.position === position + 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "2";
                position = 0;
            }
        }
        if (set === "2") {
            tracks.set2.forEach((track) => {
                if (track.position === position + 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "3";
                position = 0;
            }
        }
        if (set === "3") {
            tracks.set3.forEach((track) => {
                if (track.position === position + 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "E";
                position = 0;
            }
        }
        if (set === "E") {
            tracks.encore.forEach((track) => {
                if (track.position === position + 1) {
                    newTrack = track;
                }
            });
        }
        if (newTrack) {
            await this.setState({ currentTrack: newTrack });
            this.audio.play();
        } else {
            this.setState({ currentTrack: tracks[Object.keys(tracks)[0]][0] });
            this.setState({ icon: faPlayCircle });
        }
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
                        onClick={() => { this.playNextTrack() }}
                    />
                </div>
                {this.renderTrackInfo()}
                <div id="audio-line"></div>
                <div id="tracker"></div>
            </div >
        );
    }

}