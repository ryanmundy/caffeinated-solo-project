const coffee = (state = [], action) => {
    switch (action.type) {
        case 'SET_COFFEE':
            return action.payload;
        default:
            return state;
    }
}

export default coffee;