import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducers from "./userReducer";
import productReducers from "./productReducer";
import categoriesReducers from "./categoryReducer"
import orderReducer from "./orderReducer"

const reducers = combineReducers({
    auth: authReducer,
    users: userReducers,
    products: productReducers,
    categories : categoriesReducers,
    orders : orderReducer
});

export default reducers;
