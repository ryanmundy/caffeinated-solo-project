import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* getAllLocations(action) {
    console.log('in getAllLocations');
    try {
        const allLocations = yield call(axios.get, `api/location/all`);
        yield dispatch({ type: 'SET_ALL_LOCATIONS', payload: allLocations.data });
    } catch (error) {
        console.log(error);
    }
}//end addReview

function* allLocations() {
    yield takeEvery('FETCH_ALL_LOCATIONS', getAllLocations)
}

export default allLocations;