import { UNKNOWN_ITEM_REQUEST, UNKNOWN_ITEM_SUCCESS, UNKNOWN_ITEM_FAILURE } from '../constants';


const initialState = {
    isLoading:false,
    successMessage:"",
    errorMessage:'',
    productId:""
}

export const UnknownItemReducers = (state=initialState, action)=> {
    switch(action.type) {
        case UNKNOWN_ITEM_REQUEST:
          return {
              ...state,
              isLoading: true,
          };
          case UNKNOWN_ITEM_SUCCESS:
            return {
              ...state,
              isLoading:false,
              successMessage:action.payload.status,
              productId:action.payload.data.scan_unknown_item_id
            };
            case UNKNOWN_ITEM_FAILURE:
            return {
              ...state,
              isLoading:false,
              errorMessage:action.payload.status,
              successMessage:"",
              productId:""
            } 
            case "REMOVE_UNKNOWN_DATA":
            return {
              ...state,
              isLoading:false,
              errorMessage:"",
              successMessage:"",
              productId:""
            }                   
        default:
          return state;
      }
}
