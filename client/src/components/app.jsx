import React, { Component, Fragment } from 'react';

import Header from './header';
import AudioPlayer from './audioPlayer';

export default class App extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                <AudioPlayer />
            </Fragment>
        )
    }
}