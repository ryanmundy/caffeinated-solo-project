import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';


function* addReview(action) {
    console.log('in addReview', action.payload);
    try {
        yield call(axios.post, '/api/reviews', action.payload);
        yield swal({
            title: "Success!",
            text: "Thank you for your review!",
            icon: "success",
        });
        yield dispatch({ type: 'FETCH_REVIEWS', payload: action.payload.product_id });
        yield dispatch({ type: 'FETCH_PRODUCTS' });
    } catch (error) {
        console.log(error);
    }
}//end addReview

function* review() {
    yield takeEvery('ADD_REVIEW', addReview)
}

export default review;