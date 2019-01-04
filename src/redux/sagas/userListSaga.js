import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUsers() {
    console.log('in fetchUsers');
    try {
        const currentUsers = yield call(axios.get, '/api/user/userList');
        yield dispatch({ type: 'SET_USERS', payload: currentUsers.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* users() {
    yield takeEvery('FETCH_USERS', fetchUsers)
}

export default users;