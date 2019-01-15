import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShots() {
    console.log('in fetchShots');
    try {
        const shots = yield call(axios.get, '/api/products/shot');
        yield dispatch({ type: 'SET_SHOTS', payload: shots.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchEnergy



function* shots() {
    yield takeEvery('FETCH_SHOTS', fetchShots)
}

export default shots;