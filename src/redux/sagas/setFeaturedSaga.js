import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

//PUT request to set featured
function* clearFeatured(action) {
    console.log('in setFeatured', action.payload);
    try {
        yield call(axios.put, `/api/products/featured/clear`);
        yield dispatch({type: 'SET_NEW_FEATURED', payload: action.payload})
    } catch (error) {
        console.log(error);
    }
}//end deleteReview

function* setNewFeatured(action) {
    console.log('in setFeatured', action.payload);
    try {
        yield call(axios.put, `/api/products/featured/set/${action.payload}`);
        yield swal({
            title: "Success!",
            text: "Featured product has been updated!",
            icon: "success",
        });
        yield dispatch({ type: 'FETCH_FEATURED' });
    } catch (error) {
        console.log(error);
    }
}//end deleteReview

function* addFeatured() {
    yield takeEvery('CLEAR_FEATURED', clearFeatured);
    yield takeEvery('SET_NEW_FEATURED', setNewFeatured);
}

export default addFeatured;