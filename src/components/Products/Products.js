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
import Comment from '@material-ui/icons/Comment';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Store from '@material-ui/icons/Store';
import Add from '@material-ui/icons/Add';

class Products extends Component {

    state = {
        newReview: {
            rating: 1,
            review_content: '',
            product_id: 0
        },
        productDisplay: {
            display: 1,
            product_name: ''
        },
        newLocation: {
            name: '',
            street_address: '',
            city: '',
            state: '',
            zip: '',
            product_id: 0,
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

    getLocations = (id) => {
        console.log('in getLocations', id);
        this.props.dispatch({ type: 'FETCH_LOCATIONS', payload: id })
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
        this.setState({
            newReview: {
                ...this.state.newReview,
                review_content: '',
                rating: 0
            }
        });
    }


    handleReviewsClick = (product) => {
        console.log('in handleReviews', product.product_table_id);
        this.getReviews(product.product_table_id);
        this.setState({
            productDisplay: {
                ...this.state.productDisplay,
                display: 2,
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
                display: 1
            }
        });
    }

    handleLocationClick = (product) => {
        console.log('in handleLocationClick', product.product_table_id);
        this.getLocations(product.product_table_id);
        this.setState({
            productDisplay: {
                ...this.state.productDisplay,
                display: 3,
                product_name: product.name
            },
            newLocation: {
                ...this.state.newLocation,
                product_id: product.product_table_id
            }
        });
    }

    //change handler for inputs
    handleChangeFor = (propertyName) => (event) => {
        event.preventDefault();
        console.log('in handleChangeFor', this.state.newLocation)
        this.setState({
            newLocation: {
                ...this.state.newLocation,
                [propertyName]: event.target.value
            }
        });
    }

    handleLocationSubmitClick = () => {
        console.log('in handleClick', this.state);
        this.props.dispatch({ type: 'ADD_LOCATION', payload: this.state.newLocation })
        this.setState({
            newLocation: {
                ...this.state.newLocation,
                store: '',
                street_address: '',
                city: '',
                state: '',
                zip: ''
            }
        });
    }


    render() {

        let cardStyle = {
            width: 300,
            display: 'inline-block',
        }

        let productCardStyle = {
            width: 300,
            display: 'inline-block',
            height: 800,
            overflowY: 'auto'
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
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <img src={product.image_url} height="300" alt=''></img>
                        <h3>Rating: {product.round}</h3>
                        <p><em>Added By: {product.username}</em></p>
                        <p>Caffeine Content: {product.caffeine_content} mg</p>
                        <p>{product.description}</p>
                        <Button id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>
                        <br/>
                        <Button id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                </div>
            );
        })

        let locations = this.props.reduxStore.Locations.map(location => {
            return (
                <p>{location.store}
                <br/> {location.street_address}
                <br/> {location.city}, {location.state} {location.zip}</p>
            );
        })

        let displayItem;

        if (this.state.productDisplay.display===1) {
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

        } else if (this.state.productDisplay.display === 2){
            displayItem =
                <div id="displayItem">
                    <Button id="returnButton" variant="contained" onClick={this.handleReturnClick}><ArrowBack />Return to Products</Button>
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
                        <input id="reviewIn" type="text" placeholder="review" value={this.state.newReview.review_content} onChange={this.handleReviewChange}></input>
                        <select value={this.state.newReview.rating} id="ratingIn" onChange={this.handleRatingChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <br />
                    <Button id="productButton" variant="contained" onClick={this.handleAddClick}><Comment />Submit Review</Button>
                    </Card>
                </div>
        } else {
            displayItem=
                <div id="displayItem">
                <Button id="returnButton" variant="contained" onClick={this.handleReturnClick}><ArrowBack />Return to Products</Button>
                <h2 id="reviewHeader">Locations to purchase {this.state.productDisplay.product_name}!</h2>
                <div>
                    <Card style={cardStyle} id="addNewReview">
                    {locations}
                    </Card></div>
                <Card style={cardStyle} id="addNewReview">
                    <h2>Where can we find this?</h2>
                    <input type="text" value={this.state.newLocation.store} placeholder="location name" onChange={this.handleChangeFor('store')}></input>
                    <br/>
                    <input type="text" value={this.state.newLocation.street_address} placeholder="street address" onChange={this.handleChangeFor('street_address')}></input>
                    <input type="text" value={this.state.newLocation.city} placeholder="city" onChange={this.handleChangeFor('city')}></input>
                    <input type="text" value={this.state.newLocation.state} placeholder="state" onChange={this.handleChangeFor('state')}></input>
                    <input type="number" value={this.state.newLocation.zip} placeholder="zip" onChange={this.handleChangeFor('zip')}></input>
                    <br />
                    <Button id="productButton" variant="contained" onClick={this.handleLocationSubmitClick}><Add/>Submit Location</Button>
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
