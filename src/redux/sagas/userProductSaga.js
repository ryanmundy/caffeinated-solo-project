import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserProducts(action) {
    console.log('in fetchUserProducts', action.payload);
    try {
        const currentUserProducts = yield call(axios.get, `/api/products/user/${action.payload}`);
        yield dispatch({ type: 'SET_USER_PRODUCTS', payload: currentUserProducts.data });
    } catch (error) {
        console.log(error);
    }
}//end fetch userProducts



function* userProducts() {
    yield takeEvery('FETCH_USER_PRODUCTS', fetchUserProducts)
}

export default userProducts;