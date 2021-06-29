import { combineReducers } from "redux";
import authReducers from  './auth.reducers';

const rootReducers =
    combineReducers({
        auth: authReducers
    });

export default rootReducers;