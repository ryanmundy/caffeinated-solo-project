import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

//DELETE request to remove user by id
function* deleteUser(action) {
    console.log('in deleteUser', action.payload);
    try {
        yield call(axios.delete, `/api/user/${action.payload}`);
        yield dispatch({ type: 'FETCH_USERS' });
    } catch (error) {
        console.log(error);
    }
}//end deleteReview

function* deleteUsers() {
    yield takeEvery('DELETE_USER', deleteUser)
}

export default deleteUsers;