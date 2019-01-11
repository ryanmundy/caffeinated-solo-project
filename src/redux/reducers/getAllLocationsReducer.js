const allLocations = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_LOCATIONS':
            return action.payload;
        default:
            return state;
    }
}

export default allLocations;