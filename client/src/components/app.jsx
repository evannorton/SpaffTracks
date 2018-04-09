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
            wasClicked: false,
            page: "",
            year: "Loading...",
            date: "Loading...",
            spaffnerds: "/"
        }
    }

    setPage(page) {
        this.setState({ page, date: "Loading...", year: "Loading...", spaffnerds: "/", wasClicked: false, navigated: false });
    }

    setYear(year) {
        this.setState({ year });
    }

    setDate(date) {
        let spaffnerds = date.spaffnerds;
        date = date.date + " - " + date.venue + ", " + date.city;
        this.setState({ date, spaffnerds });
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
                    <Header
                        page={this.state.page}
                        year={this.state.year}
                        date={this.state.date}
                        spaffnerds={this.state.spaffnerds}
                    />
                    <Switch>
                        <Route
                            exact path="/"
                            render={(routeProps) => (
                                <Years
                                    {...routeProps}
                                    setPage={(page) => { this.setPage(page) }}
                                />
                            )}
                        />
                        <Route
                            exact path="/year/:year"
                            render={(routeProps) => (
                                <Shows
                                    {...routeProps}
                                    setPage={(page) => { this.setPage(page) }}
                                    setYear={(year) => { this.setYear(year) }}
                                />
                            )}
                        />
                        <Route
                            exact path="/show/:date"
                            render={(routeProps) => (
                                <Tracks
                                    {...routeProps}
                                    setPage={(page) => { this.setPage(page) }}
                                    setDate={(date) => { this.setDate(date) }}
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