import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* getLocations(action) {
    console.log('in getLocations', action.payload);
    try {
        const locations = yield call(axios.get, `api/location?id=${action.payload}`);
        yield dispatch({ type: 'SET_LOCATIONS', payload: locations.data });
    } catch (error) {
        console.log(error);
    }
}//end addLocation

function* locations() {
    yield takeEvery('FETCH_LOCATIONS', getLocations)
}

export default locations;