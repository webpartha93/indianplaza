import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import {LoginReducer} from './Reducers/AuthReducers'
import { VerificationReducer } from "./Reducers/VerificationReducers";
import { AllReducers } from "./Reducers/AllReducers";
import { CartReducer } from "./Reducers/CartReducers";
import { CheckOutReducers } from "./Reducers/CheckOutReducers";
import { HistoryReducers } from "./Reducers/HistoryReducers";
import { UnknownItemReducers } from "./Reducers/UnknownItemReducers";


const reducers = combineReducers({
    Login : LoginReducer,
    Verify: VerificationReducer,
    AllReducers: AllReducers,
    CartReducer:CartReducer,
    CheckOutReducers:CheckOutReducers,
    HistoryReducers:HistoryReducers,
    UnknownItemReducers:UnknownItemReducers
});

const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;