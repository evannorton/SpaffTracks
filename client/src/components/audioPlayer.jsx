import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle'
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle'

export default class AudioPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrack: 'http://phish.in/audio/000/017/963/17963.mp3',
            icon: faPlayCircle
        }
        this.audio;
    }

    componentDidMount() {
        this.audio = $('audio')[0];
    }

    handlePlayButtonClick() {
        if (this.audio.paused) {
            this.setState({ icon: faPauseCircle });
            this.audio.play();
        } else {
            this.setState({ icon: faPlayCircle });
            this.audio.pause();
        }
    }

    render() {
        return (
            <div id="audio-player" className="container-fluid">
                <audio
                    src={this.state.currentTrack}
                    type="audio/mp3"
                />
                <FontAwesomeIcon id="play-button"
                    icon={this.state.icon}
                    onClick={() => { this.handlePlayButtonClick() }}
                />
            </div >
        );
    }

}