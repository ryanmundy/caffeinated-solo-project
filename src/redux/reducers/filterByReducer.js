const filteredProducts = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTERED_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

export default filteredProducts;