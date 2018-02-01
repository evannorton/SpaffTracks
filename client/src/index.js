import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HelloWorld from './components/hello.jsx';
import GoodbyeWorld from './components/goodbye.jsx';

const Navigation = () => (
        <Router>
            <Fragment>
                <Link to="/goodbye">Goodbye</Link>
                <Switch>
                    <Route exact path="/" component={HelloWorld} />
                    <Route path="/goodbye" component={GoodbyeWorld} />
                </Switch>
            </Fragment>
        </Router>
)

render(<Navigation />, document.getElementById('root'));