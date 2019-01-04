import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* addProduct(action) {
    console.log('in addProduct');
    try {
        yield call(axios.post, '/api/products', action.payload);
        yield dispatch({ type: 'FETCH_PRODUCTS' });
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* newProduct() {
    yield takeEvery('ADD_PRODUCT', addProduct)
}

export default newProduct;