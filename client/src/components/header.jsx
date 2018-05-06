import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "babel-polyfill";

import { get } from '../services/base';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDoubleLeft from "@fortawesome/fontawesome-free-solid/faAngleDoubleLeft";
import faAngleDoubleRight from "@fortawesome/fontawesome-free-solid/faAngleDoubleRight";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            next: "",
            previous: ""
        }
    }

    async componentWillReceiveProps(props) {
        if (props.page === "tracks" && props.date !== "Loading...") {
            let next = await get("/shows/next/" + props.date.substring(0, 10));
            let previous = await get("/shows/previous/" + props.date.substring(0, 10));
            if (next) {
                $("#next-show").css({ visibility: "unset" });
                next = next.date;
            } else {
                $("#next-show").css({ visibility: "hidden" });
            }
            if (previous) {
                $("#previous-show").css({ visibility: "unset" });
                previous = previous.date;
            } else {
                $("#previous-show").css({ visibility: "hidden" });
            }
            this.setState({ next, previous });
        }
    }

    renderBackButton() {
        if (this.props.page === "shows") {
            return (
                <Link to="/" className="back-button">
                    ← Home
                </Link>
            );
        } else if (this.props.page === "tracks" && this.props.date !== "Loading...") {
            return (
                <Link to={"/year/" + this.props.date.substring(0, 4)} className="back-button">
                    ← {this.props.date.substring(0, 4)}
                </Link>
            );
        }
    }

    renderHeaderInfo() {
        if (this.props.page === "shows") {
            return (
                <h1>{this.props.year}</h1>
            );
        } else if (this.props.page === "tracks") {
            return (
                <div>
                    <h1 id="header-date">

                        {this.props.date}

                    </h1>
                    <span id="previous-show">
                        <Link className="show-navigation" to={`/show/${this.state.previous}`}>
                            <FontAwesomeIcon
                                icon={faAngleDoubleLeft}
                            />
                        </Link>
                    </span>
                    <a target="_blank" href={this.props.spaffnerds}>Setlist: Spaffnerds.com</a>
                    <span id="next-show">
                        <Link className="show-navigation" to={`/show/${this.state.next}`}>
                            <FontAwesomeIcon
                                icon={faAngleDoubleRight}
                            />
                        </Link>
                    </span>
                </div >
            );
        } else {
            return (
                <Link to="/" id="logo-link">
                    <img id="logo" src="/images/SpaffTracks.png" alt="SpaffTracks" />
                </Link>
            );
        }
    }

    render() {
        return (
            <header className="container-fluid d-flex align-items-center justify-content-center">
                {this.renderBackButton()}
                <a id="donate" href="https://www.paypal.me/spafftracks">Donate!</a>
                {this.renderHeaderInfo()}
            </header >
        );
    }

}