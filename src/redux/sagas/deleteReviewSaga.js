import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

//DELETE request to remove review by id
function* deleteReview(action) {
    console.log('in deleteProject', action.payload);
    try {
        yield call(axios.delete, `/api/reviews/${action.payload}`);
        yield dispatch({ type: 'FETCH_ALL_REVIEWS' });
    } catch (error) {
        console.log(error);
    }
}//end deleteReview

function* deleteReviews() {
    yield takeEvery('DELETE_REVIEW', deleteReview)
}

export default deleteReviews;