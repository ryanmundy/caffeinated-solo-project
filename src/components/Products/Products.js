import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './Products.css';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

class Products extends Component {

    state = {
        newReview: {
            rating: 1,
            review_content: ''
        }
    }

    componentDidMount() {
       this.getProducts();
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }

    handleRatingChange = (event) => {
        this.setState({
            newReview: {
                rating: event.target.value
            }
        });
        console.log('state is', this.state.newReview);
        
    }

    handleReviewChange = (event) => {
        this.setState({
            newReview: {
                review_content: event.target.value
            }
        });
        console.log('state is', this.state.newReview);
    }
    

    render() {

        let cardStyle = {
            width: 500,
            display: 'inline-block'
        }

        let products = this.props.reduxStore.currentProducts.map(product=> {
            return (
                <div>
                    <CardActionArea>
                    <Card style={cardStyle} key={product.id} id="product">
                            <h2>{product.name}</h2>
                            <img src={product.image_url} height="400" alt=''></img>
                            <h3>Rating: {product.rating}</h3>
                            <p><em>Added By: {product.username}</em></p>
                            <p>Caffeine Content: {product.caffeine_content} mg</p>
                            <p>{product.description}</p>
                            <h3>Reviews:</h3>
                            <p>{product.review_content}</p>
                            <h4>Review this product!</h4>
                            <input type="text" onChange={this.handleReviewChange}></input>
                        <select onChange={this.handleRatingChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                            <br/>
                            <Button variant="contained">Submit Review</Button>
                        </Card> 
                        </CardActionArea> 
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
