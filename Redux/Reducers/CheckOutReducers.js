import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../constants';


const initialState = {
    isLoggedIn:false,
    checkoutSuccessMessage:"",
    errorMessage:''
}

export const CheckOutReducers = (state=initialState, action)=> {
    switch(action.type) {
        case CHECKOUT_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case CHECKOUT_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              checkoutSuccessMessage:action.payload
            };
            case CHECKOUT_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
            }            
        default:
          return state;
      }
}
