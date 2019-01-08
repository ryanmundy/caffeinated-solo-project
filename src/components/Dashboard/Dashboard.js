import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './Dashboard.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
// import DeleteIcon from '@material-ui/icons/Delete';


class Dashboard extends Component {

    state = {
        newProduct: {
            name: '',
            caffeine_content: 0,
            description: '',
            image_url: '',
            added_by: this.props.id,
            category_id: 1
        },
        person: {
            status: this.props.admin
        }
    }

    componentDidMount() {
        this.getProducts();
        this.getUsers();
        this.getReviews();
        this.getUserProducts(this.props.id);
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }

    getUsers = () => {
        this.props.dispatch({ type: 'FETCH_USERS' })
    }

    getReviews = () => {
        this.props.dispatch({ type: 'FETCH_ALL_REVIEWS' })
    }

    getUserProducts = (id) => {
        this.props.dispatch({ type: 'FETCH_USER_PRODUCTS', payload: id })
    }

    //change handler for inputs
    handleChangeFor = (propertyName) => (event) => {
        event.preventDefault();
        console.log('in handleChangeFor', this.state.newProduct)
        this.setState({
            newProduct: {
                ...this.state.newProduct,
                [propertyName]: event.target.value
            }
        });
    }

    //click handler for adding product
    handleSubmit = event => {
        console.log('this is state', this.state.newProduct);
        this.props.dispatch({ type: 'ADD_PRODUCT', payload: this.state.newProduct })
    }

    handleDeleteReview = (id) => {
        console.log('in handleReviewDelete', id);
        this.props.dispatch({ type: 'DELETE_REVIEW', payload: id })

    }

    handleDeleteProduct = (id) => {
        console.log('in handleDeleteProduct', id);
        this.props.dispatch({ type: 'DELETE_PRODUCT', payload: id })

    }

    handleFeatured = (id) => {
        console.log('in handleFeatured', id);
        this.props.dispatch({ type: 'CLEAR_FEATURED', payload: id })
    }


    render() {

        // maps over products  and creates new table rows
        let newProductRow =
            this.props.reduxStore.currentProducts.map((product, i )=> {
                return (
                    <TableRow key={i} id={product.id}>
                        <TableCell id="tableCell"><img src={product.image_url} height="75" alt=''></img></TableCell>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.round}</TableCell>
                        <TableCell id="tableCell">{product.username}</TableCell>
                        <TableCell><Button variant="contained" onClick={() => this.handleFeatured(product.product_table_id)}>Set Featured</Button></TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={() => this.handleDeleteProduct(product.product_table_id)}>Delete Product</Button></TableCell>
                    </TableRow>
                );
            })

        let newUserProductRow =
            this.props.reduxStore.currentUserProducts.map((product, i) => {
                return (
                    <TableRow key={i} id={product.id}>
                        <TableCell id="tableCell"><img src={product.image_url} height="75" alt=''></img></TableCell>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.round}</TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={() => this.handleDeleteProduct(product.product_table_id)}>Delete Product</Button></TableCell>
                    </TableRow>
                );
            })

        let newReviewsRow =
            this.props.reduxStore.allReviews.map((review, i) => {
                return (
                    <TableRow key={i} id={review.id}>
                        <TableCell id="tableCell">{review.name}</TableCell>
                        <TableCell id="tableCell">{review.review_content}</TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={()=>this.handleDeleteReview(review.id)}>Delete Review</Button></TableCell>
                    </TableRow>
                );
            })

        let newUserRow =
            this.props.reduxStore.currentUsers.map((user, i) => {
                return (
                    <TableRow key={i} id={user.id}>
                        <TableCell id="tableCell">{user.username}</TableCell>
                        <TableCell><Button variant="contained" color="secondary">Delete User</Button></TableCell>
                    </TableRow>
                );
            })

        let cardStyle = {
            width: 500,
            height: 200,
            display: 'inline-block'
        }


        let pageDisplay;
        if (this.state.person.status) {
            pageDisplay =
            <div>
                <div>
                <h2 id="currentProductsHeader">Current Products</h2>
                <Table class="center" id="productTable">
                    <TableHead>
                        <TableRow>
                            <th></th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Added By</th>
                            <th>Action</th>
                            <th>Action</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newProductRow}
                    </TableBody>
                </Table>
                </div>
                <div>
                    <h2 id="dashboardHeader">Reviews</h2>
                    <Table class="center" id="productTable">
                        <TableHead>
                            <TableRow>
                                <th>Product</th>
                                <th>Review</th>
                                <th>Action</th>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newReviewsRow}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <h2 id="dashboardHeader">Manage Users</h2>
                    <Table class="center" id="productTable">
                        <TableHead>
                            <TableRow>
                                <th>Username</th>
                                <th>Action</th>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newUserRow}
                        </TableBody>
                    </Table>
                </div>
            </div>
        } else {
            pageDisplay =
            <div>
            <h2 id="currentProductsHeader">Your Products</h2>
            <Table class="center" id="productTable">
                <TableHead>
                    <TableRow>
                        <th></th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newUserProductRow}
                </TableBody>
            </Table>
            </div>
        }

        return (
            <div>
                <Card style={cardStyle} id="addNew">
                    <h2>Add New Product</h2>
                    <input type="text" placeholder="name" onChange={this.handleChangeFor('name')}></input>
                    <input type="number" placeholder="caffeine content" onChange={this.handleChangeFor('caffeine_content')}></input>
                    <input type="text" placeholder="description" onChange={this.handleChangeFor('description')}></input>
                    <input type="text" placeholder="image url" onChange={this.handleChangeFor('image_url')}></input>
                    <select onChange={this.handleChangeFor('name')}>
                        <option value={1}>Energy Drink</option>
                        <option value="2">Coffee</option>
                        <option value="3">Tea</option>
                    </select>
                    <br/>
                    <button className="log-in" onClick={this.handleSubmit}>Add Product</button>
                </Card>
                {pageDisplay}
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Dashboard);