import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* filterProducts(action) {
    console.log('in filterProducts', action.payload);
    try {
        const filteredProducts = yield call(axios.get, `/api/products/filter?id=${action.payload}`);
        yield dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filteredProducts.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchFiltered



function* filtered() {
    yield takeEvery('FILTER_BY', filterProducts)
}

export default filtered;