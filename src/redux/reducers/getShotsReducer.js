const shots = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHOTS':
            return action.payload;
        default:
            return state;
    }
}

export default shots;