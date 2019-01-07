import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* getAllReviews() {
    console.log('in getAllReviews');
    try {
        const currentReviews = yield call(axios.get, `api/products/reviews`);
        yield dispatch({ type: 'SET_ALL_REVIEWS', payload: currentReviews.data });
    } catch (error) {
        console.log(error);
    }
}//end addReview

function* allReviews() {
    yield takeEvery('FETCH_ALL_REVIEWS', getAllReviews)
}

export default allReviews;