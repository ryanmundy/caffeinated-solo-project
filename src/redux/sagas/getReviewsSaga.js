import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* getReviews(action) {
    console.log('in getReviews', action.payload);
    try {
        const review = yield call(axios.get, `api/products/review?id=${action.payload}`);
        yield dispatch({ type: 'SET_REVIEWS', payload: review.data });
    } catch (error) {
        console.log(error);
    }
}//end addReview

function* reviews() {
    yield takeEvery('FETCH_REVIEWS', getReviews)
}

export default reviews;