import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./Reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

const rootReducer = combineReducers({
  productList: productListReducer,
} as any);

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
