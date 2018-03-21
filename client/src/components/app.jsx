import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Years from './years';
import Shows from './shows';
import Tracks from './tracks';
import AudioPlayer from './audioPlayer';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Years} />
                        <Route exact path="/year/:year" component={Shows} />
                        <Route exact path="/show/:date" component={Tracks} />
                    </Switch>
                    <AudioPlayer />
                </Fragment>
            </Router>
        );
    }
}