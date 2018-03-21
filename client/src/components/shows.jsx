import React, { Component } from 'react';

import { get } from '../services/base';

import Show from './show';

export default class Shows extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
    }

    componentDidMount() {
        get('/shows')
            .then((shows) => {
                this.setState({ shows });
            });
    }

    render() {
        return (
            <div id="shows" className="bubble bubble-fluid container-fluid d-flex align-items-start justify-content-center">
                <div className="row">
                    {
                        this.state.shows.map((show) => {
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