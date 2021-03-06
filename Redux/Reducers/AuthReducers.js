import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';


const initialState = {
    isLoggedIn:false,
    loginData:"",
    errorMessage:''
}

export const LoginReducer = (state=initialState, action)=> {
    switch(action.type) {
        case LOGIN_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case LOGIN_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              loginData:action.payload
            };
            case LOGIN_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
            }            
        default:
          return state;
      }
}
