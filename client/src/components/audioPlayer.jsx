import React, { Component } from "react";
import "babel-polyfill";

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faPlayCircle from "@fortawesome/fontawesome-free-solid/faPlayCircle"
import faPauseCircle from "@fortawesome/fontawesome-free-solid/faPauseCircle"

export default class AudioPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrack: this.props.track,
            icon: faPlayCircle
        }
        this.audio;
    }

    componentDidMount() {
        this.audio = $("audio")[0];
    }

    componentWillReceiveProps(props) {
        if (props.wasClicked) {
            this.playTrack(props.clickedTrack.url);
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

    render() {
        return (
            <div id="audio-player" className="container-fluid">
                <audio
                    src={this.state.currentTrack}
                    type="audio/ogg"
                />
                <FontAwesomeIcon id="play-button"
                    icon={this.state.icon}
                    onClick={() => {
                        if (this.audio.paused) {
                            this.resumeTrack();
                        } else {
                            this.pauseTrack();
                        }
                    }}
                />
            </div >
        );
    }

}