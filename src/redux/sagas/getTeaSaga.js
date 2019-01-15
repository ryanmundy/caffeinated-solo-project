import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTea() {
    console.log('in fetchTea');
    try {
        const tea = yield call(axios.get, '/api/products/tea');
        yield dispatch({ type: 'SET_TEA', payload: tea.data });
    } catch (error) {
        console.log(error);
    }
}//end fetchCoffee



function* tea() {
    yield takeEvery('FETCH_TEA', fetchTea)
}

export default tea;