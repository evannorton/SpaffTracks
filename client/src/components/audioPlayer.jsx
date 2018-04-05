import React, { Component, Fragment } from "react";
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
            trackerPosition: 0,
            trackerIsHeld: false
        }
        this.audio;
        this.tracker;
        this.audioLine;
    }

    componentDidMount() {
        this.audio = $("audio")[0];
        this.audio.ontimeupdate = () => { this.moveTracker() };
        this.audio.onended = () => { this.playNextTrack() };
        this.audio.onplay = () => { this.setState({ icon: faPauseCircle }); };
        this.audio.onpause = () => { this.setState({ icon: faPlayCircle }); };
        this.tracker = $("#tracker");
        this.audioLine = $("#audio-line");
    }

    componentWillReceiveProps(props) {
        this.setState({ tracks: props.tracks });
        if (props.wasClicked) {
            $("#audio-player").css("visibility", "visible");
            $("#pre-audio").css("visibility", "hidden");
            this.playTrack(props.clickedTrack);
        }
    }

    async playTrack(track) {
        await this.setState({ currentTrack: track })
        this.audio.currentTime = 0;
        this.audio.play();
    }

    async playPreviousTrack() {
        let tracks = this.state.tracks;
        let currentTrack = this.state.currentTrack;
        let set = currentTrack.set;
        let position = currentTrack.position;
        let newTrack;
        if (set === "E") {
            tracks.encore.forEach((track) => {
                if (track.position === position - 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "3";
                position = tracks.set3.length + 1;
            }
        }
        if (set === "3") {
            tracks.set3.forEach((track) => {
                if (track.position === position - 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "2";
                position = tracks.set2.length + 1;
            }
        }
        if (set === "2") {
            tracks.set2.forEach((track) => {
                if (track.position === position - 1) {
                    newTrack = track;
                }
            });
            if (!newTrack) {
                set = "1";
                position = tracks.set1.length + 1;
            }
        }
        if (set === "1") {
            tracks.set1.forEach((track) => {
                if (track.position === position - 1) {
                    newTrack = track;
                }
            });
        }
        if (newTrack) {
            await this.setState({ currentTrack: newTrack });
            this.audio.play();
        } else {
            this.playTrack(currentTrack);
        }
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
        let currentTime = $("#timing");
        let currentMinutes = Math.floor(this.audio.currentTime / 60).toString();
        let currentSeconds = Math.floor(this.audio.currentTime % 60).toString();
        if (currentSeconds == "60") {
            currentSeconds = "0";
        }
        if (currentSeconds.length === 1) {
            currentSeconds = "0" + currentSeconds;
        }
        let durationMinutes = Math.floor(this.audio.duration / 60).toString();
        let durationSeconds = Math.floor(this.audio.duration % 60).toString();
        if (durationSeconds.length === 1) {
            durationSeconds = "0" + durationSeconds;
        }
        if (this.audio.duration) {
            currentTime.text(currentMinutes + ":" + currentSeconds + " / " + durationMinutes + ":" + durationSeconds);
        } else {
            currentTime.text("Loading...");
        }
        let currentProgress = this.audio.currentTime / this.audio.duration;
        let lineWidth = this.audioLine.css("width");
        lineWidth = parseInt(lineWidth.substring(0, lineWidth.length - 2));
        let currentPosition = currentProgress * lineWidth;
        currentPosition = currentPosition + 138;
        this.tracker.css("margin-left", `${currentPosition}px`);
    }

    jumpPosition(e) {
        let newPosition = (e.clientX - 161);
        let lineWidth = this.audioLine.css("width");
        lineWidth = parseInt(lineWidth.substring(0, lineWidth.length - 2));
        let percent = newPosition / lineWidth;
        this.audio.currentTime = percent * this.audio.duration;
        let currentProgress = this.audio.currentTime / this.audio.duration;
        let currentPosition = currentProgress * lineWidth;
        currentPosition = currentPosition + 138;
        this.tracker.css("margin-left", `${currentPosition}px`);
    }

    async dragPosition() {
        await this.setState({ trackerIsHeld: true });
        $(document).mousemove((e) => {
            if (this.state.trackerIsHeld) {
                this.jumpPosition(e);
            }
        });
        $(document).mouseup(() => {
            this.setState({ trackerIsHeld: false });
        });
    }

    toggleDate() {
        let date = $("#date");
        let height = (date.css("height"));
        height = "" + height + "";
        height = height.substring(0, height.length - 2);
        if (height > 11) {
            date.css("visibility", "hidden");
        } else {
            date.css("visibility", "visible");
        }
    }

    toggleTitle() {
        let title = $("#title");
        let position = "" + title.css("width") + "";
        if (position !== "undefined") {
            position = position.substring(0, position.length - 2);
            position = parseInt(position) + 350;
            if (position > $(window).width()) {
                title.css("visibility", "hidden");
            } else {
                title.css("visibility", "visible");
            }
        }

    }

    renderTrackInfo() {
        this.toggleDate();
        this.toggleTitle();
        $(window).on('resize', () => {
            this.toggleDate();
            this.toggleTitle();
        });
        if (this.state.currentTrack.title) {
            return (
                <Fragment>
                    <div id="track-info">
                        <div id="title">
                            {this.state.currentTrack.title}
                        </div>
                        <div id="date">
                            {this.state.currentTrack.venue}, {this.state.currentTrack.city}, {this.state.currentTrack.date}
                        </div>
                    </div>
                    <p id="timing"></p>
                </Fragment>
            );
        }
    }

    render() {
        return (
            <Fragment>
                <div id="audio-player" className="d-flex container-fluid align-items-center">
                    <audio
                        src={this.state.currentTrack.url}
                        type="audio/mp3"
                    />
                    <div id="buttons" className="d-flex align-items-center">
                        <FontAwesomeIcon
                            className="direction-button"
                            icon={faBackward}
                            onClick={() => { this.playPreviousTrack() }}
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
                    <div
                        id="audio-line"
                        onClick={(e) => { this.jumpPosition(e) }}
                    ></div>
                    <div
                        id="tracker"
                        onMouseDown={() => { this.dragPosition() }}
                    ></div>
                </div >
                <div id="pre-audio">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <p>Select a track to play!</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}