import { combineReducers } from "redux";
import { productListReducer } from "./productReducers";

const reducers = combineReducers({
    product: productListReducer
});

export default reducers;