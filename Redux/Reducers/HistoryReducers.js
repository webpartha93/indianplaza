import { GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE, GET_HISTORY_DETAILS_REQUEST, GET_HISTORY_DETAILS_SUCCESS, GET_HISTORY_DETAILS_FAILURE } from '../constants';


const initialState = {
    isLoading:false,
    SuccessMessage:"",
    errorMessage:'',
    allHistory:"",
    historyDetails:""
}

export const HistoryReducers = (state=initialState, action)=> {
    switch(action.type) {
        case GET_HISTORY_REQUEST:
          return {
              ...state,
              isLoading: true,
          };
          case GET_HISTORY_SUCCESS:
            return {
              ...state,
              isLoading:false,
              allHistory:action.payload
            };
            case GET_HISTORY_FAILURE:
            return {
              ...state,
              isLoading:false,
              allHistory:""
            }
            case GET_HISTORY_DETAILS_REQUEST:
            return {
              ...state,
              isLoading:true
            }
            case GET_HISTORY_DETAILS_SUCCESS:
            return {
              ...state,
              isLoading:false,
              historyDetails:action.payload
            };
            case GET_HISTORY_DETAILS_FAILURE:
            return {
              ...state,
              isLoading:false,
              historyDetails:""
            }           
        default:
          return state;
      }
}
