import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Main extends Component {
    componentDidMount() {
        this.getFeatured();
    }

    getFeatured = () => {
        this.props.dispatch({ type: 'FETCH_FEATURED' })
    }

    render() {

        let featuredProduct = this.props.reduxStore.featured.map(product => {
            return (
                <Card id="product" key={product.id}>
                    {/* <h3>{product.name}</h3>
                    <img src={product.image_url} width="300" alt=''></img> */}
                    <CardActionArea>
                        <h1>Featured Product</h1>
                        <h2>{product.name}</h2>
                        <img src={product.image_url} height="300" alt=''></img>
                        <CardContent>

                            <Typography variant="h5" component="p">
                                {product.description}
                            </Typography>
                            <Typography component="p">
                                <em>Added by: {product.username}</em>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        })
        
        return (
            <div>
            <div>
                <h1>Main Page</h1>
                {JSON.stringify(this.props.reduxStore.featured[0])}
            </div>
            <div>
                    <Card>
                       {featuredProduct}
                    </Card>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Main);