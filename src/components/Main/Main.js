import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './Main.css';


class Main extends Component {
    componentDidMount() {
        this.getFeatured();
    }

    getFeatured = () => {
        this.props.dispatch({ type: 'FETCH_FEATURED' })
    }

    render() {

        let cardStyle = {
            width: 300
        }

        let featuredProduct = this.props.reduxStore.featured.map(product => {
            return (
                <Card style={cardStyle} id="product" key={product.id}>
                    <h1>Featured Product</h1>
                    <h2>{product.name}</h2>
                    <h3>Rating: {product.rating}</h3>
                    <p><em>Added By: {product.username}</em></p>
                    <img src={product.image_url} height="300" alt=''></img>
                </Card>
            );
        })

        return (
            <div>
                <div id="welcome">
                    <h1><em>Welcome to the page of all things caffeine!</em></h1>
                    <h4><em>Login or sign up for a free account to begin sharing your favorite products!</em></h4>
                    {/* {JSON.stringify(this.props.reduxStore.featured[0])} */}
                </div>
                <div>
                    {featuredProduct}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Main);