import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEnergy() {
    console.log('in fetchEnergy');
    try {
        const energy = yield call(axios.get, '/api/products/energy');
        yield dispatch({ type: 'SET_ENERGY', payload: energy.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchEnergy



function* energy() {
    yield takeEvery('FETCH_ENERGY', fetchEnergy)
}

export default energy;