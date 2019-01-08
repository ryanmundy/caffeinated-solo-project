const currentUserProducts = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

export default currentUserProducts;