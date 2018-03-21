import React, { Component } from 'react';

import { get } from '../services/base';

export default class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        }
    }

    componentDidMount() {
        get('/tracks')
            .then((tracks) => {
                this.setState({ tracks });
            });
    }

    render() {
        return (
            <div id="tracks" className="bubble container-fluid d-flex align-items-center justify-content-center">
                <div className="row">
                    {
                        this.state.tracks.map((show) => {
                            return (
                                <Show key={show.id} show={show} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}