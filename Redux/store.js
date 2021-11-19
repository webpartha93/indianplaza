import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import {LoginReducer} from './Reducers/AuthReducers'
import { VerificationReducer } from "./Reducers/VerificationReducers";
import { AllReducers } from "./Reducers/AllReducers";


const reducers = combineReducers({
    Login : LoginReducer,
    Verify: VerificationReducer,
    AllReducers: AllReducers
});

const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;