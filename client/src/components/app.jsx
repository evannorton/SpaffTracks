import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Years from './years';
import AudioPlayer from './audioPlayer';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Years} />
                    </Switch>
                    <AudioPlayer />
                </Fragment>
            </Router>
        );
    }
}