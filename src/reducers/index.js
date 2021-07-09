import { combineReducers } from "redux";
import authReducers from  './auth.reducers';
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducrer from "./product.reducrer";

const rootReducers =
    combineReducers({
        auth: authReducers,
        user: userReducer,
        category:categoryReducer,
        product:productReducrer
    });

export default rootReducers;