import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

//DELETE request to remove product by id
function* deleteProduct(action) {
    console.log('in deleteProduct', action.payload);
    try {
        yield call(axios.delete, `/api/products/${action.payload.product_table_id}`);
        yield dispatch({ type: 'FETCH_PRODUCTS' });
        yield dispatch({ type: 'FETCH_USER_PRODUCTS', payload: action.payload.added_by })
    } catch (error) {
        console.log(error);
    }
}//end deleteReview

function* deleteProducts() {
    yield takeEvery('DELETE_PRODUCT', deleteProduct)
}

export default deleteProducts;