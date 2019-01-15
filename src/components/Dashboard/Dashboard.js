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
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Grade from '@material-ui/icons/Grade';
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


class Dashboard extends Component {

    state = {
        newProduct: {
            name: '',
            caffeine_content: '',
            description: '',
            image_url: '',
            added_by: this.props.id,
            category_id: 1
        },
        person: {
            status: this.props.admin
        },
        editing: {
            mode: false
        },
        productToEdit: {
            product_table_id: 0,
            name: '',
            caffeine_content: '',
            description: '',
            image_url: '',
            added_by: 0,
            category_id: 1
        }
    }

    componentDidMount() {
        this.getProducts(this.props.id);
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

    handleChangeForEdit = (propertyName) => (event) => {
        event.preventDefault();
        console.log('in handleChangeForEdit', this.state.productToEdit)
        this.setState({
            productToEdit: {
                ...this.state.productToEdit,
                [propertyName]: event.target.value
            }
        });
    }

    //click handlers
    handleSubmit = event => {
        console.log('this is state', this.state.newProduct);
        this.props.dispatch({ type: 'ADD_PRODUCT', payload: this.state.newProduct })
        this.setState({
            newProduct: {
                ...this.state.newProduct,
                name: '',
                caffeine_content: '',
                description: '',
                image_url: '',
                category_id: 1
            }
        })
    }

    handleDeleteReview = (id) => {
        console.log('in handleReviewDelete', id);
        this.props.dispatch({ type: 'DELETE_REVIEW', payload: id })

    }

    handleDeleteProduct = (product) => {
        console.log('in handleDeleteProduct', product);
        this.props.dispatch({ type: 'DELETE_PRODUCT', payload: product })

    }

    handleFeatured = (id) => {
        console.log('in handleFeatured', id);
        this.props.dispatch({ type: 'CLEAR_FEATURED', payload: id })
    }

    handleDeleteUser = (id) => {
        console.log('in handleDeleteUser', id);
        this.props.dispatch({ type: 'DELETE_USER', payload: id })
    }

    handleEdit = (product) => {
        console.log('in handleEdit', product);
        this.setState({
            editing: {
                mode: true
            },
            productToEdit: {
                product_table_id: product.product_table_id,
                name: product.name,
                caffeine_content: product.caffeine_content,
                description: product.description,
                image_url: product.image_url,
                added_by: product.added_by,
                category_id: product.category_id
            }
        })
    }

    handleEditSubmit = event => {
        console.log('this is state', this.state.productToEdit);
        this.props.dispatch({ type: 'EDIT_PRODUCT', payload: this.state.productToEdit })
        this.setState({
            editing: {
                mode: false
            }
        })
    }


    render() {
        console.log(this.state);
        // maps over products  and creates new table rows
        let newProductRow =
            this.props.reduxStore.currentProducts.map((product, i) => {
                return (
                    <TableRow key={i} id={product.id}>
                        <TableCell id="tableCell"><img src={product.image_url} height="75" alt=''></img></TableCell>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.round}</TableCell>
                        <TableCell id="tableCell">{product.username}</TableCell>
                        <TableCell><Button variant="contained" onClick={() => this.handleEdit(product)}><Edit /></Button></TableCell>
                        <TableCell><Button variant="contained" onClick={() => this.handleFeatured(product.product_table_id)}><Grade />Set Featured</Button></TableCell>
                        <TableCell><Button variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete this product?')) this.handleDeleteProduct(product) }}><DeleteIcon></DeleteIcon></Button></TableCell>
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
                        <TableCell><Button variant="contained" onClick={() => this.handleEdit(product)}><Edit />Edit</Button></TableCell>
                        <TableCell><Button variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete this product?')) this.handleDeleteProduct(product) }}><DeleteIcon></DeleteIcon></Button></TableCell>
                    </TableRow>
                );
            })

        let newReviewsRow =
            this.props.reduxStore.allReviews.map((review, i) => {
                return (
                    <TableRow key={i} id={review.id}>
                        <TableCell id="tableCell">{review.name}</TableCell>
                        <TableCell id="tableCell">{review.review_content}</TableCell>
                        <TableCell><Button variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete this review?')) this.handleDeleteReview(review.id) }}><DeleteIcon></DeleteIcon></Button></TableCell>
                    </TableRow>
                );
            })

        let newUserRow =
            this.props.reduxStore.currentUsers.map((user, i) => {
                return (
                    <TableRow key={i} id={user.id}>
                        <TableCell id="tableCell">{user.username}</TableCell>
                        <TableCell><Button variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) this.handleDeleteUser(user.id) }}><DeleteIcon></DeleteIcon></Button></TableCell>
                    </TableRow>
                );
            })

        let cardStyle = {
            width: 500,
            height: 200,
            display: 'inline-block'
        }


        let pageDisplay;
        if (this.state.person.status && this.state.editing.mode === false) {
            pageDisplay =
                <div>
                    <div>
                        <Card style={cardStyle} id="addNew">
                            <h2>Add New Product</h2>
                            <input value={this.state.newProduct.name} type="text" placeholder="name" onChange={this.handleChangeFor('name')}></input>
                            <input value={this.state.newProduct.caffeine_content} type="number" placeholder="caffeine content" onChange={this.handleChangeFor('caffeine_content')}></input>
                            <input value={this.state.newProduct.description} type="text" placeholder="description" onChange={this.handleChangeFor('description')}></input>
                            <input value={this.state.newProduct.image_url} type="text" placeholder="image url" onChange={this.handleChangeFor('image_url')}></input>
                            <select value={this.state.newProduct.category_id} onChange={this.handleChangeFor('category_id')}>
                                <option value={1}>Energy Drink</option>
                                <option value={2}>Coffee</option>
                                <option value={3}>Tea</option>
                                <option value={4}>Energy Shot</option>
                            </select>
                            <br />
                            <Button variant="contained" onClick={this.handleSubmit}><Add />Add Product</Button>
                        </Card>
                    </div>
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
                        <Table class="center" id="reviewTable">
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
        } else if (this.state.person.status === false && this.state.editing.mode === false) {
            pageDisplay =
                <div>
                    <div>
                        <Card style={cardStyle} id="addNew">
                            <h2>Add New Product</h2>
                            <input value={this.state.newProduct.name} type="text" placeholder="name" onChange={this.handleChangeFor('name')}></input>
                            <input value={this.state.newProduct.caffeine_content} type="number" placeholder="caffeine content" onChange={this.handleChangeFor('caffeine_content')}></input>
                            <input value={this.state.newProduct.description} type="text" placeholder="description" onChange={this.handleChangeFor('description')}></input>
                            <input value={this.state.newProduct.image_url} type="text" placeholder="image url" onChange={this.handleChangeFor('image_url')}></input>
                            <select value={this.state.newProduct.category_id} onChange={this.handleChangeFor('category_id')}>
                                <option value={1}>Energy Drink</option>
                                <option value={2}>Coffee</option>
                                <option value={3}>Tea</option>
                                <option value={4}>Energy Shot</option>
                            </select>
                            <br />
                            <Button variant="contained" onClick={this.handleSubmit}><Add />Add Product</Button>
                        </Card>
                    </div>
                    <div>
                    </div>
                    <h2 id="currentProductsHeader">Your Products</h2>
                    <Table class="center" id="productTable">
                        <TableHead>
                            <TableRow>
                                <th></th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Action</th>
                                <th>Action</th>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newUserProductRow}
                        </TableBody>
                    </Table>
                </div>
        } else {
            pageDisplay =
                <div>
                    <Card style={cardStyle} id="addNew">
                        <h2>Edit Product</h2>
                        <input type="text" placeholder="name" placeholder={this.state.productToEdit.name} onChange={this.handleChangeForEdit('name')}></input>
                        <input type="number" placeholder="caffeine content" placeholder={this.state.productToEdit.caffeine_content} onChange={this.handleChangeForEdit('caffeine_content')}></input>
                        <input type="text" placeholder="description" placeholder={this.state.productToEdit.description} onChange={this.handleChangeForEdit('description')}></input>
                        <input type="text" placeholder="image url" placeholder={this.state.productToEdit.image_url} onChange={this.handleChangeForEdit('image_url')}></input>
                        <select placeholder={this.state.productToEdit.category_id} onChange={this.handleChangeForEdit('category_id')}>
                            <option value={1}>Energy Drink</option>
                            <option value={2}>Coffee</option>
                            <option value={3}>Tea</option>
                        </select>
                        <br />
                        <Button variant="contained" onClick={this.handleEditSubmit}><Save />Save</Button>
                    </Card>
                </div>
        }



        return (
            <div>
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