import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './Dashboard.css';


class Dashboard extends Component {
    componentDidMount() {
        
    }


    render() {

        return (
            <div>
                <p>this is from the dashboard</p>
                <p>The user is {this.props.user} and their id is {this.props.id}</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Dashboard);