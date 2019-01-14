const storeProducts = (state = '', action) => {
    switch (action.type) {
        case 'SET_STORE_PRODUCTS':
            return action.payload;
        case 'CLEAR_STORE_PRODUCTS':
            return ''
        default:
            return state;
    }
}

export default storeProducts;