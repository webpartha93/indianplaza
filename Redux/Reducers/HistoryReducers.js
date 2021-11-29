import { GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE } from '../constants';


const initialState = {
    isLoading:false,
    SuccessMessage:"",
    errorMessage:'',
    allHistory:""
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
        default:
          return state;
      }
}
