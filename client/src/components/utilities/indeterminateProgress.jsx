import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IndeterminateProgress extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card mx-auto" style={{ width: '400px' }}>
                <div className="card-body">
                    <p className="card-text text-center">{ this.props.message }</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
IndeterminateProgress.propTypes = {
    message: PropTypes.string
};

IndeterminateProgress.defaultProps = {
    message: 'Loading...'
};

export default IndeterminateProgress;