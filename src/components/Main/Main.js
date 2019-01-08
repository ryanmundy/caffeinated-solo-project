import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './Main.css';
import { Grid } from '@material-ui/core';


class Main extends Component {
    componentDidMount() {
        this.getFeatured();
    }

    getFeatured = () => {
        this.props.dispatch({ type: 'FETCH_FEATURED' })
    }

    render() {

        let cardStyle = {
            width: 300,
            height: 500,
            display: 'inline-block'
        }

        let featuredProduct = this.props.reduxStore.featured.map(product => {
            return (
                <div>
                    {/* <Grid> */}
                        <Card style={cardStyle} id="productImage" key={product.id}>
                            <img src={product.image_url} height="500" alt=''></img>
                        </Card>
                        <Card style={cardStyle} id="productInfo">
                            <h1>Featured Product</h1>
                            <h2>{product.name}</h2>
                            <h3>Rating: {product.rating}</h3>
                            <p><em>Added By: {product.username}</em></p>
                            <p>Caffeine Content: {product.caffeine_content} mg</p>
                            <p>{product.description}</p>
                        </Card>
                        <Card style={cardStyle} id="needCaffeine">
                            <h1>Need caffeine now?</h1>
                            <h3>Click below to find nearest location to purchase!</h3>
                            <Button variant="contained">Find Caffeine!</Button>
                        </Card>
                    {/* </Grid> */}
                </div>
            );
        })

        return (
            <div>
                <div id="welcomeMain">
                    <h1><em>Welcome to the page of all things caffeine!</em></h1>
                    <h4><em>Login or sign up for a free account to begin sharing your favorite products!</em></h4>
                    {/* {JSON.stringify(this.props.reduxStore.featured[0])} */}
                </div>
                <div id="featuredDiv">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    {featuredProduct}
                    </Grid>
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