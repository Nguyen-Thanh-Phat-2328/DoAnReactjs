const initialState = {
    total: 0
}
const totalCart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                total: state.total + action.payload.price
            };
        // case 'REMOVE_FROM_CART':
        //     return {
        //         ...state,
        //         total: state.total - action.payload.price
        //     };
        default:
            return state;
    }
}

export default totalCart;