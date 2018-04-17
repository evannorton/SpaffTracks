import React, { Component, Fragment } from 'react';

import { get } from '../services/base';

import Track from './track';

export default class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: {
                soundcheck: [],
                set1: [],
                set2: [],
                set3: [],
                encore: []
            }
        }
    }

    componentDidMount() {
        this.props.setPage("tracks");
        get('/tracks/show/' + this.props.match.params.date)
            .then((tracks) => {
                this.setState({ tracks });
                this.props.setTracks(tracks);
                for (let i = 0; i < Object.keys(tracks).length; i++) {
                    if (tracks[Object.keys(tracks)[i]].length > 0) {
                        this.props.setDate(tracks[Object.keys(tracks)[i]][0]);
                        this.setState({ date: tracks[Object.keys(tracks)[i]][0].date });
                        break;
                    }
                }
            });
    }

    componentDidUpdate() {
        let date = this.state.date;
        let newDate = window.location.pathname.substring(6);
        let track;
        if (date && date != newDate) {
            console.log("ASDASDASD");
            get('/tracks/show/' + this.props.match.params.date)
                .then((tracks) => {
                    for (let i = 0; i < Object.keys(tracks).length; i++) {
                        if (tracks[Object.keys(tracks)[i]].length > 0) {
                            track = tracks[Object.keys(tracks)[i]][0]
                            break;
                        }
                    }
                    date = newDate;
                    this.setState({ tracks, date });
                    this.props.setDate(track);
                    this.props.setTracks(tracks);
                });
        }
    }

    renderSoundcheck() {
        if (this.state.tracks.soundcheck.length > 0) {
            return (
                <Fragment>
                    <div className="col-12 set-label bubble-tile d-flex align-items-center justify-content-center">
                        Soundcheck
                    </div>
                    {
                        this.state.tracks.soundcheck.map((track) => {
                            return (
                                <Track key={track.id} track={track} setClickedTrack={this.props.setClickedTrack} />
                            );
                        })
                    }
                </Fragment>
            );
        }
    }

    renderSet1() {
        if (this.state.tracks.set1.length > 0) {
            return (
                <Fragment>
                    <div className="col-12 set-label bubble-tile d-flex align-items-center justify-content-center">
                        Set 1
                    </div>
                    {
                        this.state.tracks.set1.map((track) => {
                            return (
                                <Track key={track.id} track={track} setClickedTrack={this.props.setClickedTrack} />
                            );
                        })
                    }
                </Fragment>
            );
        }
    }

    renderSet2() {
        if (this.state.tracks.set2.length > 0) {
            return (
                <Fragment>
                    <div className="col-12 set-label bubble-tile d-flex align-items-center justify-content-center">
                        Set 2
                    </div>
                    {
                        this.state.tracks.set2.map((track) => {
                            return (
                                <Track key={track.id} track={track} setClickedTrack={this.props.setClickedTrack} />
                            );
                        })
                    }
                </Fragment>
            );
        }
    }

    renderSet3() {
        if (this.state.tracks.set3.length > 0) {
            return (
                <Fragment>
                    <div className="col-12 set-label bubble-tile d-flex align-items-center justify-content-center">
                        Set 3
                    </div>
                    {
                        this.state.tracks.set3.map((track) => {
                            return (
                                <Track key={track.id} track={track} setClickedTrack={this.props.setClickedTrack} />
                            );
                        })
                    }
                </Fragment>
            );
        }
    }

    renderEncore() {
        if (this.state.tracks.encore.length > 0) {
            return (
                <Fragment>
                    <div className="col-12 set-label bubble-tile d-flex align-items-center justify-content-center">
                        Encore
                    </div>
                    {
                        this.state.tracks.encore.map((track) => {
                            return (
                                <Track key={track.id} track={track} setClickedTrack={this.props.setClickedTrack} />
                            );
                        })
                    }
                </Fragment>
            );
        }
    }

    render() {
        return (
            <div id="tracks" className="bubble container-fluid d-flex align-items-start justify-content-center">
                <div className="row">
                    {this.renderSoundcheck()}
                    {this.renderSet1()}
                    {this.renderSet2()}
                    {this.renderSet3()}
                    {this.renderEncore()}
                </div>
            </div>
        );
    }
}