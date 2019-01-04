import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './Dashboard.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withTheme } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import DeleteIcon from '@material-ui/icons/Delete';


class Dashboard extends Component {

    componentDidMount() {
        this.getProducts();
        this.getUsers();
    }

    getProducts = () => {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' })
    }

    getUsers = () => {
        this.props.dispatch({ type: 'FETCH_USERS' })
    }


    render() {
        
        //maps over products  and creates new table rows
        let newProductRow =
            this.props.reduxStore.currentProducts.map(product => {
                return (
                    <TableRow key={product.id} id={product.id}>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.rating}</TableCell>
                        <TableCell id="tableCell">{product.username}</TableCell>
                        <TableCell><Button variant="contained">Set Featured</Button></TableCell>
                        <TableCell><Button variant="contained" color="secondary">Delete Product</Button></TableCell>
                    </TableRow>
                );
            })

        let newReviewsRow =
            this.props.reduxStore.currentProducts.map(product => {
                return (
                    <TableRow key={product.id} id={product.id}>
                        <TableCell id="tableCell">{product.name}</TableCell>
                        <TableCell id="tableCell">{product.review_content}</TableCell>
                        <TableCell><Button variant="contained" color="secondary">Delete Review</Button></TableCell>
                    </TableRow>
                );
            })   

        let newUserRow =
            this.props.reduxStore.currentUsers.map(user => {
                return (
                    <TableRow key={user.id} id={user.id}>
                        <TableCell id="tableCell">{user.username}</TableCell>
                        <TableCell><Button variant="contained" color="secondary">Delete User</Button></TableCell>
                    </TableRow>
                );
            })

        return (
            <div>
                <p>this is from the dashboard</p>
                <p>The user is {this.props.user} and their id is {this.props.id}</p>
                <h2 id="dashboardHeader">Current Products</h2>
                <Table class="center" id="productTable">
                    <TableHead>
                        <TableRow>
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
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Dashboard);