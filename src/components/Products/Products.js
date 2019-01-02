import React, { Component } from 'react';
import { connect } from 'react-redux';

class Products extends Component {
    componentDidMount() {
       
    }

    render() {
        return (
            <div>
                <h1>Products go here</h1>
            </div>
        )
    }
}

export default connect()(Products);
