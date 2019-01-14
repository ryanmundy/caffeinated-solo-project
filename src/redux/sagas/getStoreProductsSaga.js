import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStoreProducts(action) {
    console.log('in fetchStoreProducts', action.payload);
    try {
        const currentStoreProducts = yield call(axios.get, `/api/products/store?lat=${action.payload.lat}&lng=${action.payload.lng}`);
        console.log(currentStoreProducts);
        
        yield dispatch({ type: 'SET_STORE_PRODUCTS', payload: currentStoreProducts.data });
    } catch (error) {
        console.log(error);
    }
}//end fetch storePoducts



function* storeProducts() {
    yield takeEvery('FETCH_STORE_PRODUCTS', fetchStoreProducts)
}

export default storeProducts;