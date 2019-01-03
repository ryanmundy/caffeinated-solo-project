import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './Products.css';

class Products extends Component {
    componentDidMount() {
       this.getProducts();
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }
    

    render() {

        let cardStyle = {
            display: 'inline-block'
        }

        let products = this.props.reduxStore.currentProducts.map(product=> {
            return (
                <div>
                    <Card style={cardStyle} key={product.id} id="product">
                            <h2>{product.name}</h2>
                            <img src={product.image_url} height="500" alt=''></img>
                            <h3>Rating: {product.rating}</h3>
                            <p><em>Added By: {product.username}</em></p>
                            <p>Caffeine Content: {product.caffeine_content} mg</p>
                            <p>{product.description}</p>
                            <h3>Reviews:</h3>
                            <p>{product.review_content}</p>
                        </Card>
                </div>
            );
        })

        return (
            <div>
                <h1 id="productsTitle"><em>Current Products</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                {products}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Products);
