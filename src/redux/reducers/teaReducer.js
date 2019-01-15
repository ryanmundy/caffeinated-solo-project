const tea = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEA':
            return action.payload;
        default:
            return state;
    }
}

export default tea;