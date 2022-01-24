import { ALL_BRANCHES_REQUEST, ALL_BRANCHES_SUCCESS, ALL_BRANCHES_FAILURE, ALL_SUPPLIER_REQUEST, ALL_SUPPLIER_SUCCESS, ALL_SUPPLIER_FAILURE, SCAN_PRODUCT_REQUEST, SCAN_PRODUCT_SUCCESS, SCAN_PRODUCT_FAILURE, PRODUCT_INFO_REQUEST, PRODUCT_INFO_SUCCESS, PRODUCT_INFO_FAILURE, SEARCH_SUPPLIER_REQUEST, SEARCH_SUPPLIER_SUCCESS, SEARCH_SUPPLIER_FAILURE } from '../constants';

const initialState = {
    isLoggedIn:false,
    isLoading:false,
    allBranch:"",
    errorMessage:'',
    allSupplier:"",
    allScanProducts:"",
    productDetails:"",
    fetchSupplier:[],
    handHeldScanner:""
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
              isLoggedIn:false,
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
              isLoggedIn:false,
              allSupplier:action.payload
            };
            case ALL_SUPPLIER_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload
          }

          case SEARCH_SUPPLIER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
            case SEARCH_SUPPLIER_SUCCESS:
              return {
                ...state,
                isLoading:false,
                fetchSupplier:action.payload
              };
              case SEARCH_SUPPLIER_FAILURE:
              return {
                ...state,
                isLoading:false,
                errorMessage:action.payload,
                fetchSupplier:[]
            }


          case SCAN_PRODUCT_REQUEST:
          return {
              ...state,
              isLoading: true,
          };
          case SCAN_PRODUCT_SUCCESS:
            return {
              ...state,
              isLoading:false,
              allScanProducts:action.payload
            };
            case SCAN_PRODUCT_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
              errorMessage:action.payload,
              allScanProducts:""
          };

          case PRODUCT_INFO_REQUEST:
          return {
              ...state,
              isLoading: true,
          };
          case PRODUCT_INFO_SUCCESS:
            return {
              ...state,
              isLoading:false,
              productDetails:action.payload
            };
            case PRODUCT_INFO_FAILURE:
            return {
              ...state,
              isLoading:false,
              errorMessage:action.payload,
              productDetails:""
            }
            case "RESET_SCAN_DATA":
              return{
                ...state,
                isLoading:false,
                errorMessage:"",
                allScanProducts:""
            }
        default:
          return state;
      }
}
