import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = withRouter(
    ({ history }) => {
        if (isLoggedIn()) {
            return <Link className="btn btn-info" to="/logout">Logout</Link>;
        } else {
            return <Link className="btn btn-info" to="/login">Login</Link>;
        }
    }
);

export default AuthButton;