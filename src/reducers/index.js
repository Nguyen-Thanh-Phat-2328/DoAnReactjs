import { combineReducers } from "redux";
import totalCart from "./totalCart";

const rootReducer = combineReducers({
    totalCart: totalCart,
})

export default rootReducer;