import React, { Component } from 'react';

import { get } from '../services/base';

import Year from './year';

export default class Years extends Component {

    constructor(props) {
        super(props);
        this.state = {
            years: []
        }
    }

    componentDidMount() {
        this.props.setPage("home");
        get('/years')
            .then((years) => {
                this.setState({ years });
            });
    }

    render() {
        return (
            <div id="years" className="bubble container-fluid d-flex align-items-center justify-content-center">
                <div className="row">
                    {
                        this.state.years.map((year) => {
                            return (
                                <Year key={year.year} year={year.year} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}