import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* editProduct(action) {
    console.log('in editProduct');
    try {
        yield call(axios.put, '/api/products', action.payload);
        yield swal({
            title: "Success!",
            text: `${action.payload.name} has been updated!`,
            icon: "success",
        });
        yield dispatch({ type: 'FETCH_PRODUCTS' });
        yield dispatch({ type: 'FETCH_USER_PRODUCTS', payload: action.payload.added_by })
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* editProducts() {
    yield takeEvery('EDIT_PRODUCT', editProduct)
}

export default editProducts;