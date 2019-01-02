import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
    componentDidMount() {
        this.getFeatured();
    }

    getFeatured = () => {
        this.props.dispatch({ type: 'FETCH_FEATURED' })
    }

    render() {
        return (
            <div>
                <h1>Main Page</h1>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(Main);