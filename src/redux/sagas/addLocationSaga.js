import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* addLocation(action) {
    console.log('in addLocation', action.payload);
    try {
        yield call(axios.post, '/api/location', action.payload);
        yield dispatch({ type: 'FETCH_LOCATIONS', payload: action.payload.product_id })
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* newLocation() {
    yield takeEvery('ADD_LOCATION', addLocation)
}

export default newLocation;