import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Years from './years';
import Shows from './shows';
import Tracks from './tracks';
import AudioPlayer from './audioPlayer';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            clickedTrack: {},
            wasClicked: false
        }
    }

    setTracks(tracks) {
        this.setState({ tracks, wasClicked: false });
    }

    setClickedTrack(clickedTrack) {
        this.setState({ clickedTrack, wasClicked: true });
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Years} />
                        <Route exact path="/year/:year" component={Shows} />
                        <Route
                            exact path="/show/:date"
                            render={(routeProps) => (
                                <Tracks
                                    {...routeProps}
                                    setTracks={(tracks) => { this.setTracks(tracks) }}
                                    setClickedTrack={(track) => { this.setClickedTrack(track) }}
                                />
                            )}
                        />
                    </Switch>
                    <AudioPlayer
                        tracks={this.state.tracks}
                        clickedTrack={this.state.clickedTrack}
                        wasClicked={this.state.wasClicked}
                    />
                </Fragment>
            </Router>
        );
    }
}