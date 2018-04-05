import React, { Component, Fragment } from 'react';

import { get } from '../services/base';

import Track from './track';

export default class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: {
                set1: [],
                set2: [],
                set3: [],
                encore: []
            }
        }
        this.asd = [];
    }

    componentDidMount() {
        this.props.setPage("tracks");
        get('/tracks/show/' + this.props.match.params.date)
            .then((tracks) => {
                this.setState({ tracks });
                this.props.setTracks(tracks);
                this.props.setDate(tracks[Object.keys(tracks)[0]][0]);
            });
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
            <div id="tracks" className="bubble container-fluid d-flex align-items-center justify-content-center">
                <div className="row">
                    {this.renderSet1()}
                    {this.renderSet2()}
                    {this.renderSet3()}
                    {this.renderEncore()}
                </div>
            </div>
        );
    }
}