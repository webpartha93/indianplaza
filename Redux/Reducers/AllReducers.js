import { ALL_BRANCHES_REQUEST, ALL_BRANCHES_SUCCESS, ALL_BRANCHES_FAILURE, ALL_SUPPLIER_REQUEST, ALL_SUPPLIER_SUCCESS, ALL_SUPPLIER_FAILURE, SCAN_PRODUCT_REQUEST, SCAN_PRODUCT_SUCCESS, SCAN_PRODUCT_FAILURE, PRODUCT_INFO_REQUEST, PRODUCT_INFO_SUCCESS, PRODUCT_INFO_FAILURE } from '../constants';

const initialState = {
    isLoggedIn:false,
    allBranch:"",
    errorMessage:'',
    allSupplier:"",
    allScanProducts:"",
    productDetails:""
}

export const AllReducers = (state=initialState, action)=> {
    switch(action.type) {
        case ALL_BRANCHES_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case ALL_BRANCHES_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              allBranch:action.payload
            };
            case ALL_BRANCHES_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
          }
          case ALL_SUPPLIER_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case ALL_SUPPLIER_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              allSupplier:action.payload
            };
            case ALL_SUPPLIER_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
          }
          case SCAN_PRODUCT_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case SCAN_PRODUCT_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              allScanProducts:action.payload
            };
            case SCAN_PRODUCT_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
          };

          case PRODUCT_INFO_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case PRODUCT_INFO_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              productDetails:action.payload
            };
            case PRODUCT_INFO_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
          }
        default:
          return state;
      }
}
