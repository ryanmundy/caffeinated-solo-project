import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFeatured() {
    console.log('in fetchFeatured');
    try {
        const featuredProduct = yield call(axios.get, '/api/products/featured');
        console.log('the featured product is', featuredProduct.data[0].name);
        yield dispatch({ type: 'SET_FEATURED', payload: featuredProduct.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* featured() {
    yield takeEvery('FETCH_FEATURED', fetchFeatured)
}

export default featured;