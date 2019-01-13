const storeProducts = (state = [], action) => {
    switch (action.type) {
        case 'SET_STORE_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

export default storeProducts;