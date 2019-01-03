import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProducts() {
    console.log('in fetchProducts');
    try {
        const currentProducts = yield call(axios.get, '/api/products');
        yield dispatch({ type: 'SET_PRODUCTS', payload: currentProducts.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* products() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts)
}

export default products;