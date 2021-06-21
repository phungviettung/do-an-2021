import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducers from "./userReducer";
import productReducers from "./productReducer";
import categoriesReducers from "./categoryReducer"
import materialReducers from "./materialReducer"
import orderReducer from "./orderReducer"
import dashboardReducer from "./dashboardReducer"

const reducers = combineReducers({
    auth: authReducer,
    users: userReducers,
    products: productReducers,
    categories : categoriesReducers,
    material : materialReducers,
    orders : orderReducer,
    dashboard : dashboardReducer
});

export default reducers;
