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
import FormControl from '@material-ui/core/FormControl';
import swal from 'sweetalert';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles"

const theme = createMuiTheme ({
    palette: {
        primary: { main: '#92E601'},
        secondary: { main: '#CC1E4A'}
    },
});

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

    handleSweetAlert = product =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, it is gone forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.handleDeleteProduct(product)
                    swal("Success! The product was deleted.", {
                        icon: "success",
                    });
                } else {
                    swal("Your product is safe!");
                }
            })
    }

    handleSweetAlertReview = review => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, it is gone forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.handleDeleteReview(review)
                    swal("Success! The review was deleted.", {
                        icon: "success",
                    });
                } else {
                    swal("The review is safe!");
                }
            })
    }

    handleSweetAlertUser = user => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, they cannot be brought back!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.handleDeleteUser(user)
                    swal("Success! The user was deleted.", {
                        icon: "success",
                    });
                } else {
                    swal("The user profile is safe!");
                }
            })
    }


    render() {
        console.log(this.state);
        // maps over products  and creates new table rows
        let buttonStyle={
            backgroundColor: '#FFC906'
        }
        let newProductRow =
            this.props.reduxStore.currentProducts.map((product, i) => {
                let featuredRow;
                if(product.featured){
                    featuredRow = <TableCell><Button style={buttonStyle} variant="contained" onClick={() => this.handleFeatured(product.product_table_id)}><Grade /></Button></TableCell>
                }else{
                    featuredRow = <TableCell><Button variant="contained" onClick={() => this.handleFeatured(product.product_table_id)}><Grade /></Button></TableCell>
                }
                return (
                    <MuiThemeProvider theme={theme}>
                    <TableRow key={i} id={product.id}>
                        <TableCell id="tableCell"><img src={product.image_url} height="75" alt=''></img></TableCell>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.round}</TableCell>
                        <TableCell id="tableCell">{product.username}</TableCell>
                        <TableCell><Button color="primary" variant="contained" onClick={() => this.handleEdit(product)}><Edit /></Button></TableCell>
                        {/* <TableCell><Button style={buttonStyle} variant="contained" onClick={() => this.handleFeatured(product.product_table_id)}><Grade /></Button></TableCell> */}
                        {featuredRow}
                        <TableCell><Button color="secondary" variant="contained" onClick={()=>this.handleSweetAlert(product)}><DeleteIcon/></Button></TableCell>
                    </TableRow>
                    </MuiThemeProvider>
                );
            })

        let newUserProductRow =
            this.props.reduxStore.currentUserProducts.map((product, i) => {
                return (
                    <MuiThemeProvider theme={theme}>
                    <TableRow key={i} id={product.id}>
                        <TableCell id="tableCell"><img src={product.image_url} height="75" alt=''></img></TableCell>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.round}</TableCell>
                        <TableCell><Button color="primary" variant="contained" onClick={() => this.handleEdit(product)}><Edit /></Button></TableCell>
                        <TableCell><Button color="secondary" variant="contained" onClick={() => this.handleSweetAlert(product)}><DeleteIcon /></Button></TableCell>
                    </TableRow>
                    </MuiThemeProvider>
                );
            })

        let newReviewsRow =
            this.props.reduxStore.allReviews.map((review, i) => {
                return (
                    <MuiThemeProvider theme={theme}>
                    <TableRow key={i} id={review.id}>
                        <TableCell id="tableCell">{review.name}</TableCell>
                        <TableCell id="tableCell">{review.review_content}</TableCell>
                        <TableCell><Button color="secondary" variant="contained" onClick={() => this.handleSweetAlertReview(review.id)}><DeleteIcon /></Button></TableCell>
                    </TableRow>
                    </MuiThemeProvider>
                );
            })

        let newUserRow =
            this.props.reduxStore.currentUsers.map((user, i) => {
                return (
                    <MuiThemeProvider theme={theme}>
                    <TableRow key={i} id={user.id}>
                        <TableCell id="tableCell">{user.username}</TableCell>
                        <TableCell><Button color="secondary" variant="contained" onClick={() => this.handleSweetAlertUser(user.id)}><DeleteIcon /></Button></TableCell>
                    </TableRow>
                    </MuiThemeProvider>
                );
            })

        let cardStyle = {
            width: 500,
            height: 525,
            display: 'inline-block'
        }


        let pageDisplay;
        if (this.state.person.status && this.state.editing.mode === false) {
            pageDisplay =
                <div>
                    <div>
                        <MuiThemeProvider theme={theme}>
                        <Card style={cardStyle} id="addNew">
                            <h2>Add New Product</h2>
                        <TextField
                                color="primary"
                            label="Name"
                            value={this.state.newProduct.name}
                            onChange={this.handleChangeFor('name')}
                            margin="normal"
                            
                        />
                        <br/>
                        <TextField
                            label="Caffeine Content"
                            type="number"
                            value={this.state.newProduct.caffeine_content}
                            onChange={this.handleChangeFor('caffeine_content')}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            label="Image URL"
                            value={this.state.newProduct.image_url}
                            onChange={this.handleChangeFor('image_url')}
                            margin="normal"
                        />
                        <br/>
                        <br/>
                        <FormControl>
                            <Select
                                onChange={this.handleChangeFor('category_id')}
                                value={this.state.newProduct.category_id}
                                placeholder="Category"
                                margin="normal"
                            >
                                <MenuItem value={1}>Energy Drink</MenuItem>
                                <MenuItem value={2}>Coffee</MenuItem>
                                <MenuItem value={3}>Tea</MenuItem>
                                <MenuItem value={4}>Energy Shot</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            label="Description"
                            value={this.state.newProduct.description}
                            onChange={this.handleChangeFor('description')}
                            margin="normal"
                            multiline rows="4"
                            variant="outlined"
                        />
                            <br />
                            <Button color="primary" id="submitButton" variant="contained" onClick={this.handleSubmit}><Add />Add Product</Button>
                        </Card>
                    </MuiThemeProvider>
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
                                    <th>Edit</th>
                                    <th>Set Featured</th>
                                    <th>Delete</th>
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
                                    <th>Delete</th>
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
                                    <th>Delete</th>
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
                    <MuiThemeProvider theme={theme}>
                        <Card style={cardStyle} id="addNew">
                            <h2>Add New Product</h2>
                        <TextField
                            label="Name"
                            value={this.state.newProduct.name}
                            onChange={this.handleChangeFor('name')}
                            margin="normal"
                            color="primary"
                        />
                        <br />
                        <TextField
                            label="Caffeine Content"
                            type="number"
                            value={this.state.newProduct.caffeine_content}
                            onChange={this.handleChangeFor('caffeine_content')}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            label="Image URL"
                            value={this.state.newProduct.image_url}
                            onChange={this.handleChangeFor('image_url')}
                            margin="normal"
                        />
                        <br/>
                        <br />
                        <FormControl>
                            <Select
                                onChange={this.handleChangeFor('category_id')}
                                value={this.state.newProduct.category_id}
                                placeholder="Category"
                                margin="normal"
                            >
                                <MenuItem value={1}>Energy Drink</MenuItem>
                                <MenuItem value={2}>Coffee</MenuItem>
                                <MenuItem value={3}>Tea</MenuItem>
                                <MenuItem value={4}>Energy Shot</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                            <TextField
                                label="Description"
                                value={this.state.newProduct.description}
                                onChange={this.handleChangeFor('description')}
                                margin="normal"
                                multiline rows="4"
                                variant="outlined"

                            />
                        <br />
                        <Button color="primary" id="submitButton" variant="contained" onClick={this.handleSubmit}><Add />Add Product</Button>
                        </Card>
                    </MuiThemeProvider>
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
                                <th>Edit</th>
                                <th>Delete</th>
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
                <MuiThemeProvider theme={theme}>
                    <Card style={cardStyle} id="addNew">
                        <h2>Edit {this.state.productToEdit.name}</h2>
                    <TextField
                        placeholder={this.state.productToEdit.name}
                        onChange={this.handleChangeForEdit('name')}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder={this.state.productToEdit.caffeine_content}
                        onChange={this.handleChangeForEdit('caffeine_content')}
                        margin="normal"
                    />
                    <br/>
                        <TextField
                            placeholder={this.state.productToEdit.image_url}
                            onChange={this.handleChangeForEdit('image_url')}
                            margin="normal"
                        />
                        <br/>                   
                    <br />                   
                    <FormControl>
                        <Select
                            onChange={this.handleChangeForEdit('category_id')}
                            placeholder={this.state.productToEdit.category_id}
                            value={this.state.productToEdit.category_id}
                            margin="normal"
                        >
                            <MenuItem value={1}>Energy Drink</MenuItem>
                            <MenuItem value={2}>Coffee</MenuItem>
                            <MenuItem value={3}>Tea</MenuItem>
                            <MenuItem value={4}>Energy Shot</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                        <TextField
                            placeholder={this.state.productToEdit.description}
                            onChange={this.handleChangeForEdit('description')}
                            margin="normal"
                            multiline rows="4"
                            variant="outlined"
                        />
                    <br />
                    <Button color="primary" id="submitButton" variant="contained" onClick={this.handleEditSubmit}><Save />Save</Button>
                    </Card>
                </MuiThemeProvider>
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