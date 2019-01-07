const reviews = (state = [], action) => {
    switch (action.type) {
        case 'SET_REVIEWS':
            return action.payload;
        default:
            return state;
    }
}

export default reviews;