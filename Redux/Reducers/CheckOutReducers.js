import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../constants';


const initialState = {
    isLoading:false,
    checkoutSuccessMessage:"",
    errorMessage:''
}

export const CheckOutReducers = (state=initialState, action)=> {
    switch(action.type) {
        case CHECKOUT_REQUEST:
          return {
              ...state,
              isLoading: true,
          };
          case CHECKOUT_SUCCESS:
            return {
              ...state,
              isLoading:false,
              checkoutSuccessMessage:action.payload
            };
            case CHECKOUT_FAILURE:
            return {
              ...state,
              isLoading:false,
              errorMessage:action.payload,
              checkoutSuccessMessage:""
            } 
            case "REMOVE_CHECKOUT_DATA":
            return {
              ...state,
              isLoading:false,
              errorMessage:"",
              checkoutSuccessMessage:""
            }                   
        default:
          return state;
      }
}
