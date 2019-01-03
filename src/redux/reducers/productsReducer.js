const currentProducts = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

export default currentProducts;