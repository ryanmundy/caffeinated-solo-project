import React, { Component } from 'react';
import { connect } from 'react-redux';

class Locate extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Map goes here</h1>
            </div>
        )
    }
}

export default connect()(Locate);
