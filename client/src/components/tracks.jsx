import React, { Component } from 'react';

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
        get('/tracks/show/' + this.props.match.params.date)
            .then((tracks) => {
                console.log(tracks.set1);
                this.setState({ tracks });
            });
    }

    render() {
        return (
            <div id="tracks" className="bubble container-fluid d-flex align-items-center justify-content-center">
                <div className="row">
                    {
                        this.state.tracks.set1.map((track) => {
                            return (
                                <Track key={track.id} track={track} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}