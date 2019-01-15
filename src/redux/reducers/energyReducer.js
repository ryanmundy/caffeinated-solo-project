const energy = (state = [], action) => {
    switch (action.type) {
        case 'SET_ENERGY':
            return action.payload;
        default:
            return state;
    }
}

export default energy;