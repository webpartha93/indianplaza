import { VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE, LOGOUT } from '../constants';


const initialState = {
    isLoggedIn:false,
    verifyData:"",
    errorMessage:''
}

export const VerificationReducer = (state=initialState, action)=> {
    switch(action.type) {
        case VERIFY_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case VERIFY_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              verifyData:action.payload
            };
            case VERIFY_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
            }
            case LOGOUT:
            return {
              ...state,
              isLoggedIn:false,
              verifyData:""
            }
        default:
          return state;
      }
}
