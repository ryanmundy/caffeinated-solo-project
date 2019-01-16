import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl } from '@material-ui/core';
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
import Gauge from 'react-svg-gauge';
import StarRatingComponent from 'react-star-rating-component';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        primary: { main: '#92E601' },
        secondary: { main: '#CC1E4A' }
    },
});

class Products extends Component {

    state = {
        newReview: {
            rating: 1,
            review_content: '',
            product_id: 0
        },
        productDisplay: {
            display: 5,
            product_name: '',
            view_display: 5
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
        this.getEnergy();
        this.getCoffee();
        this.getTea();
        this.getShots();
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }

    getEnergy = () => {
        this.props.dispatch({ type: 'FETCH_ENERGY' })
    }

    getCoffee = () => {
        this.props.dispatch({ type: 'FETCH_COFFEE' })
    }

    getTea = () => {
        this.props.dispatch({ type: 'FETCH_TEA' })
    }

    getShots = () => {
        this.props.dispatch({ type: 'FETCH_SHOTS' })
    }

    

    getReviews = (id) => {
        console.log('in getReviews', id);
        this.props.dispatch({ type: 'FETCH_REVIEWS', payload: id })
    }

    // filterBy = (category) => {
    //     console.log('in filterBy', category);
    //     this.props.dispatch({ type: 'FILTER_BY', payload: category })

    // }

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
                display: 6,
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
                ...this.state.productDisplay,
                display: this.state.productDisplay.view_display
            }
        });
    }

    handleLocationClick = (product) => {
        console.log('in handleLocationClick', product.product_table_id);
        this.getLocations(product.product_table_id);
        this.setState({
            productDisplay: {
                ...this.state.productDisplay,
                display: 7,
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

    handleFilterChange = (event) => {
        this.setState({
            productDisplay: {
                display: Number(event.target.value),
                view_display: Number(event.target.value)
            }
        });
        // console.log('state is', this.state.productDisplay);

    }


    render() {
        console.log('state is', this.state.productDisplay);

        let cardStyle = {
            width: 400,
            display: 'inline-block',
        }

        let productCardStyle = {
            width: 350,
            display: 'inline-block',
            height: 675,
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
                    <MuiThemeProvider theme={theme}>
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <br />
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                        <br />
                        <p><em>Added By: {product.username}</em></p>
                        <img src={product.image_url} height="300" alt=''></img>
                        <br />
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                        <p>{product.description}</p>
                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>

                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
            );
        })

        let locations = this.props.reduxStore.Locations.map(location => {
            return (
                <p>{location.store}
                    <br /> {location.street_address}
                    <br /> {location.city}, {location.state} {location.zip}</p>
            );
        })

        let energyDrinks = this.props.reduxStore.energy.map((product, i) => {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <br />
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                        <br />
                        <p><em>Added By: {product.username}</em></p>
                        <img src={product.image_url} height="300" alt=''></img>
                        <br />
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                        <p>{product.description}</p>
                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>

                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
            );
        })

        let coffee = this.props.reduxStore.coffee.map((product, i) => {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <br />
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                        <br />
                        <p><em>Added By: {product.username}</em></p>
                        <img src={product.image_url} height="300" alt=''></img>
                        <br />
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                        <p>{product.description}</p>
                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>

                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
            );
        })

        let tea = this.props.reduxStore.tea.map((product, i) => {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <br />
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                        <br />
                        <p><em>Added By: {product.username}</em></p>
                        <img src={product.image_url} height="300" alt=''></img>
                        <br />
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                        <p>{product.description}</p>
                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>

                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
            );
        })

        let shots = this.props.reduxStore.shots.map((product, i) => {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                    <Card style={productCardStyle} key={i} id="product">
                        <h2>{product.name}</h2>
                        <h3>({product.category})</h3>
                        <br />
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={product.round}
                        />
                        <br />
                        <p><em>Added By: {product.username}</em></p>
                        <img src={product.image_url} height="300" alt=''></img>
                        <br />
                        <Gauge value={product.caffeine_content} color="#92E601" max={400} width={150} height={150} label="Caffeine Content" />
                        <p>{product.description}</p>
                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleReviewsClick(product)}><Comment />Reviews</Button>

                        <Button color="primary" id="productButton" variant="contained" onClick={() => this.handleLocationClick(product)}><Store />Where to Buy</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
            );
        })

        let filterStyle = {
            minWidth: 120,
            marginLeft: 20,
            backgroundColor: "#92E601"
        }

        let filter;
        if (
            this.state.productDisplay.display === 5 ||
            this.state.productDisplay.display === 1 ||
            this.state.productDisplay.display === 2 ||
            this.state.productDisplay.display === 3 ||
            this.state.productDisplay.display === 4 ||
            this.state.productDisplay.display === 6 ||
            this.state.productDisplay.display === 7
        ) {
            filter = <div> <h4 id="filterTitle">Filter By:</h4>
                {/* <select selected={this.state.productDisplay.view_display} id="filterSelect" onChange={this.handleFilterChange}>
                    <option value={5}>All</option>
                    <option value={1}>Energy Drinks</option>
                    <option value={2}>Coffee</option>
                    <option value={3}>Tea</option>
                    <option value={4}>Energy Shots</option>
                </select></div> */}
                <FormControl>
                    <MuiThemeProvider theme={theme}>
                    <Select
                        id="filterSelect"
                        onChange={this.handleFilterChange}
                        value={this.state.productDisplay.view_display}
                        style={filterStyle}
                        color="primary"
                        input={
                            <OutlinedInput
                            />
                        }
                >
                        <MenuItem value={5}>All</MenuItem>
                        <MenuItem value={1}>Energy Drinks</MenuItem>
                        <MenuItem value={2}>Coffee</MenuItem>
                        <MenuItem value={3}>Tea</MenuItem>
                        <MenuItem value={4}>Energy Shots</MenuItem>
                    </Select>
                    </MuiThemeProvider>
                </FormControl>
            </div>
        }

        let displayItem;

        if (this.state.productDisplay.display === 5) {
            displayItem = <div>
                <h1 id="productsTitle"><em>All Products</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {products}
                </Grid>
            </div>

        } else if (this.state.productDisplay.display === 6) {
            displayItem =
                <div id="displayItem">
                <MuiThemeProvider theme={theme}>
                    <Button id="returnButton" color="primary" variant="contained" onClick={this.handleReturnClick}><ArrowBack />Return to Products</Button>
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
                        {/* <input id="reviewIn" type="text" placeholder="review" value={this.state.newReview.review_content} onChange={this.handleReviewChange}></input> */}
                        <TextField
                            id="reviewIn"
                            label="Review"
                            value={this.state.newReview.review_content}
                            onChange={this.handleReviewChange}
                            margin="normal"
                            color="primary"
                            multiline rows="4"
                            variant="outlined"
                        />
                        <br/>
                        <br />
                        <p>Rating</p>
                        {/* <select value={this.state.newReview.rating} id="ratingIn" onChange={this.handleRatingChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select> */}
                        <FormControl>
                            <Select
                                onChange={this.handleRatingChange}
                                value={this.state.newReview.rating}
                                placeholder="rating"
                                color="primary"
                                variant="contained"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <br />
                        <Button color="primary" id="productButton" variant="contained" onClick={this.handleAddClick}><Comment />Submit Review</Button>
                    </Card>
                </MuiThemeProvider>
                </div>
        } else if (this.state.productDisplay.display === 7) {
            displayItem =
            
                <div id="displayItem">
                <MuiThemeProvider theme={theme}>
                    <Button id="returnButton" color="primary" variant="contained" onClick={this.handleReturnClick}><ArrowBack />Return to Products</Button>
                    <h2 id="reviewHeader">Locations to purchase {this.state.productDisplay.product_name}!</h2>
                    <div>
                        <Card style={cardStyle} id="addNewReview">
                            {locations}
                        </Card></div>
                    <Card style={cardStyle} id="addNewReview">
                        {/* <h2>Where can we find this?</h2>
                        <input type="text" value={this.state.newLocation.store} placeholder="location name" onChange={this.handleChangeFor('store')}></input>
                        <br />
                        <input type="text" value={this.state.newLocation.street_address} placeholder="street address" onChange={this.handleChangeFor('street_address')}></input>
                        <input type="text" value={this.state.newLocation.city} placeholder="city" onChange={this.handleChangeFor('city')}></input>
                        <input type="text" value={this.state.newLocation.state} placeholder="state" onChange={this.handleChangeFor('state')}></input>
                        <input type="number" value={this.state.newLocation.zip} placeholder="zip" onChange={this.handleChangeFor('zip')}></input>
                        <br /> */}
                        <TextField
                            label="Location Name"
                            value={this.state.newLocation.store}
                            onChange={this.handleChangeFor('store')}
                            margin="normal"
                            color="primary"
                        />
                    <TextField
                        label="Street Address"
                        value={this.state.newLocation.street_address}
                        onChange={this.handleChangeFor('street_address')}
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        value={this.state.newLocation.city}
                        onChange={this.handleChangeFor('city')}
                        margin="normal"
                    />
                    <TextField
                        label="State"
                        value={this.state.newLocation.state}
                        onChange={this.handleChangeFor('state')}
                        margin="normal"
                    />
                    <TextField
                        type="number"
                        label="Zip"
                        value={this.state.newLocation.zip}
                        onChange={this.handleChangeFor('zip')}
                        margin="normal"
                    />
                        <br/>
                        <Button color="primary" id="productButton" variant="contained" onClick={this.handleLocationSubmitClick}><Add />Submit Location</Button>
                    </Card>
                    </MuiThemeProvider>
                </div>
        } else if (this.state.productDisplay.display === 1) {
            displayItem = <div>
                <h1 id="productsTitle"><em>Energy Drinks</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {energyDrinks}
                </Grid>
            </div>
        } else if (this.state.productDisplay.display === 2) {
            displayItem = <div>
                <h1 id="productsTitle"><em>Coffee</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {coffee}
                </Grid>
            </div>
        } else if (this.state.productDisplay.display === 3) {
            displayItem = <div>
                <h1 id="productsTitle"><em>Tea</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {tea}
                </Grid>
            </div>
        } else if (this.state.productDisplay.display === 4) {
            displayItem = <div>
                <h1 id="productsTitle"><em>Energy Shots</em></h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    {shots}
                </Grid>
            </div>
        }


        return (
            <div>
                <div>
                    {filter}
                </div>
                <div>{displayItem}</div>
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
