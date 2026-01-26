const cartLocalStorage = JSON.parse(localStorage.getItem('cartRedux')) ? JSON.parse(localStorage.getItem('cartRedux')) : {};
const calculateTotalCart = (cart) => {
    let totalCart = 0;
    Object.keys(cart).forEach(key => {
        totalCart = totalCart + cart[key];
    });
    return totalCart;
}

const initialState = {
    cart: cartLocalStorage,
    totalCart: calculateTotalCart(cartLocalStorage)
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_CART' : {
            const {id} = action.payload;
            let {qty} = action.payload;
            Object.keys(state.cart).map(key => {
                if(key == id) {
                    qty = qty + state.cart[key];
                }
            })
            const newCart = {...state.cart, [id]: qty};
            return {
                cart: newCart,
                totalCart: calculateTotalCart(newCart)
            }  
        }

        case 'UPP_QUANTITY_CART' : {
            const id = action.payload;
            let newQty = 0;
            Object.keys(state.cart).map(key => {
                if(id == key){
                    newQty = state.cart[id] + 1;
                }
            })
            const newCart = {...state.cart, [id]: newQty};
            return {
                cart: newCart,
                totalCart: calculateTotalCart(newCart)
            }
        }

        case 'DOWN_QUANTITY_CART' : {
            const id = action.payload;
            let newQty = 0;
            Object.keys(state.cart).map(key => {
                if(id == key){
                    newQty = state.cart[id] - 1;
                }
            })
            const newCart = {...state.cart, [id]: newQty};
            return {
                cart: newCart,
                totalCart: calculateTotalCart(newCart)
            }
        }

        case 'DELETE_CART' : {
            const id = action.payload;
            const newCart = {...state.cart};
            delete newCart[id];
            return {
                cart: newCart,
                totalCart: calculateTotalCart(newCart)
            }
        }

        default:
            return state;
    }
}

export default cartReducer;