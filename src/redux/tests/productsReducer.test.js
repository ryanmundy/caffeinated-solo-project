import currentProducts from '../reducers/productsReducer';

describe('Testing products reducer', () => {
    test('should have all products', () => {
        let testPayload = [{name: 'John'}]
        let action = { type: 'SET_PRODUCTS', payload: testPayload };
        expect(currentProducts([], action)).toEqual(testPayload)
    })
})