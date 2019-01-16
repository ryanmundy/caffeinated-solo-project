import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* addLocation(action) {
    console.log('in addLocation', action.payload);
    try {
        yield call(axios.post, '/api/location', action.payload);
        yield swal({
            title: "Success!",
            text: "Thank you for sharing a location!",
            icon: "success",
        });
        yield dispatch({ type: 'FETCH_LOCATIONS', payload: action.payload.product_id })
    } catch (error) {
        console.log(error);
    }
}//end fetchFeatured

function* newLocation() {
    yield takeEvery('ADD_LOCATION', addLocation)
}

export default newLocation;