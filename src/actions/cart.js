export const addToCart = (id, qty) => {
    return {
        type: 'ADD_TO_CART',
        payload: { id, qty }
    }
}

export const uppQuantityCart = (id) => {
    return {
        type: 'UPP_QUANTITY_CART',
        payload: id
    }
}

export const downQuantityCart = (id) => {
    return {
        type: 'DOWN_QUANTITY_CART',
        payload: id
    }
}

export const deleteCart = (id) => {
    return {
        type: 'DELETE_CART',
        payload: id
    }
}