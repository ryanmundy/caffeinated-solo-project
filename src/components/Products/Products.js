import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './Products.css';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Products extends Component {

    state = {
        newReview: {
            rating: 1,
            review_content: '',
            product_id: 0
        },
        productDisplay: {
            display: true,
            product_name: ''
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
        this.props.dispatch({ type: 'ADD_REVIEW', payload: this.state.newReview  })
    }


    handleReviewsClick = (product) => {
        console.log('in handleReviews', product.product_table_id);
        this.getReviews(product.product_table_id);
        this.setState({
            productDisplay: {
                ...this.state.productDisplay,
                display: false,
                product_name: product.name
            },
            newReview: {
                ...this.state.newReview,
                product_id: product.product_table_id
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
                <TableRow key={review.id} id={review.id}>
                    <TableCell id="tableCell">{review.rating}</TableCell>
                    <TableCell id="tableCell">{review.review_content}</TableCell>
                </TableRow>
            );
        })

        let products = this.props.reduxStore.currentProducts.map((product, i) => {
            return (
                <div>
                    <Card style={cardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <img src={product.image_url} height="300" alt=''></img>
                        <h3>Rating: {product.round}</h3>
                        <p><em>Added By: {product.username}</em></p>
                        <p>Caffeine Content: {product.caffeine_content} mg</p>
                        <p>{product.description}</p>
                        <Button variant="contained" onClick={() => this.handleReviewsClick(product)}>Reviews</Button>
                    </Card>
                </div>
            );
        })

        let displayItem;

        if (this.state.productDisplay.display) {
            displayItem = <div>
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
            displayItem = 
            <div id="displayItem">
                <Button id="returnButton" variant="contained" onClick={this.handleReturnClick}>Return to Products</Button>
                <h2 id="reviewHeader">Reviews for {this.state.productDisplay.product_name}</h2>
                <Table class="center" id="reviewsTable">
                    <TableHead>
                        <TableRow>
                            <th>Rating</th>
                            <th>Reviews</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews}
                    </TableBody>
                </Table>
               
                <Card style={cardStyle} id="addNewReview">
                <h2>Review this product!</h2>
                    <input type="text" onChange={this.handleReviewChange}></input>
                    <select onChange={this.handleRatingChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <Button variant="contained" onClick={this.handleAddClick}>Submit Review</Button>
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
