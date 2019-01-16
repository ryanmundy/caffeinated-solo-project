import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './Main.css';
import { Grid } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import Gauge from 'react-svg-gauge';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        primary: { main: '#92E601' },
        secondary: { main: '#CC1E4A' }
    },
});


class Main extends Component {
    componentDidMount() {
        this.getFeatured();
    }

    getFeatured = () => {
        this.props.dispatch({ type: 'FETCH_FEATURED' })
    }

    handleCaffeineClick = () => {
        this.props.history.push('/locate');
    }

    render() {

        let cardStyle = {
            width: 300,
            height: 500,
            display: 'inline-block',
            overflowY: 'auto'
        }

        let productCardStyle = {
            height: 500,
            display: 'inline-block'
            
        }

        let caffeineCardStyle = {
            width: 350,
            height: 500,
            display: 'inline-block'
        }

        let featuredProduct = this.props.reduxStore.featured.map(product => {
            return (
                <div>
                    {/* <Grid> */}
                        <Card style={productCardStyle} id="productImage" key={product.id}>
                            <img src={product.image_url} height="500" alt=''></img>
                        </Card>
                        <Card style={cardStyle} id="productInfo">
                            <h1>Featured Product</h1>
                            <h2>{product.name}</h2>
                            {/* <h3>Rating: {product.round}</h3> */}
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                            <p><em>Added By: {product.username}</em></p>
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                            {/* <p>Caffeine Content: {product.caffeine_content} mg</p> */}
                            <p>{product.description}</p>
                        </Card>
                        <Card style={caffeineCardStyle} id="needCaffeine">
                            <h1>Need caffeine now?</h1>
                        <img id="battery" src="https://res.cloudinary.com/teepublic/image/private/s--pcvQDlsa--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1453880733/production/designs/404282_1.jpg" alt='low battery' />
                            <h3>Click to see where you can find it!</h3>
                            <MuiThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" onClick={this.handleCaffeineClick}>Find Caffeine!</Button>
                        </MuiThemeProvider>
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