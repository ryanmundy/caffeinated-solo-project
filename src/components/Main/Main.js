import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Main Page</h1>
            </div>
        )
    }
}

export default connect()(Main);