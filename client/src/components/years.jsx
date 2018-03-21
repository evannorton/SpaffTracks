import React, { Component } from 'react';

import { get } from '../services/base';

export default class Years extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        get('/years')
            .then((years) => {
                console.log(years);
                this.setState({ years });
            })
    }

    render() {
        return (
            <div></div>
        );
    }

}