import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCoffee() {
    console.log('in fetchCoffee');
    try {
        const coffee = yield call(axios.get, '/api/products/coffee');
        yield dispatch({ type: 'SET_COFFEE', payload: coffee.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchCoffee



function* Coffee() {
    yield takeEvery('FETCH_COFFEE', fetchCoffee)
}

export default Coffee;