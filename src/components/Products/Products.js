import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './Products.css';
import Button from '@material-ui/core/Button';

class Products extends Component {

    state = {
        newReview: {
            rating: 1,
            review_content: '',
            product_id: 0,
            completed: false
        },
        productDisplay: {
            display: true
        }
    }

    componentDidMount() {
       this.getProducts();
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }

    getReviews = (id) => {
        console.log('in getReviews', id);
        
        this.props.dispatch({ type: 'FETCH_REVIEWS', payload: id })
    }

    handleRatingChange = (event) => {
        this.setState({
            newReview: {
                ...this.state.newReview,
                rating: event.target.value
            }
        });
        console.log('state is', this.state.newReview);
        
    }

    handleReviewChange = (event) => {
        this.setState({
            newReview: {
                ...this.state.newReview,
                review_content: event.target.value
            }
        });
        console.log('state is', this.state.newReview);
    }


    handleAddClick = () => {
        console.log('in handleClick', this.state);
        this.props.dispatch({ type: 'ADD_REVIEW', payload: this.state.newReview })
    }


    handleReviewsClick = (id) => {
        console.log('in handleReviews', id);
        this.getReviews(id);
        this.setState({
            productDisplay: {
                ...this.state.productDisplay,
                display: false
            }
        });
    }

    handleReturnClick = () => {
        this.setState({
            productDisplay: {
                display: true
            }
        });
    }
    

    render() {

        let cardStyle = {
            width: 300,
            display: 'inline-block'
        }

        let reviews = this.props.reduxStore.reviews.map(review => {
            return (
                <div style={cardStyle} key={review.id} id="review">
                    {/* <p>{review.name} {review.review_content}</p> */}
                    
                        <h2>Reviews</h2>
                        <h3>{review.name}</h3>
                        <p>{review.review_content}</p>
                        
                
                </div>
            );
        })

        let products = this.props.reduxStore.currentProducts.map((product,i)=> {
            return (
                <div>
                    <Card style={cardStyle} key={i} id="product">
                            <h2>{product.name}</h2>
                            <img src={product.image_url} height="300" alt=''></img>
                            <h3>Rating: {product.rating}</h3>
                            <p><em>Added By: {product.username}</em></p>
                            <p>Caffeine Content: {product.caffeine_content} mg</p>
                            <p>{product.description}</p>
                            <p>id is {product.product_table_id}</p>
                            <Button onClick={()=>this.handleReviewsClick(product.product_table_id)}>Reviews</Button>
                            {/* <input type="text" onChange={()=>this.handleReviewChange}></input>
                        <select onChange={this.handleRatingChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                            <br/>
                        <Button variant="contained" onClick={this.handleAddClick}>Submit Review</Button> */}
                        </Card>
                </div>
            );
        })

        let displayItem;

        if (this.state.productDisplay.display) {
            displayItem = <div>
                {/* {reviews} */}
                <h1 id="productsTitle"><em>Current Products</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {products}
                </Grid>
            </div>

        } else {
            displayItem = <div>
                {/* {reviews} */}
                <Card>
                {reviews}
                    <Button onClick={this.handleReturnClick}>Return to Products</Button>
                </Card>
                    
                
            </div>
        }

        return (
            
            <div>{displayItem}</div>
            
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Products);
