import { GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE } from '../constants';


const initialState = {
    isLoggedIn:false,
    SuccessMessage:"",
    errorMessage:'',
    allHistory:""
}

export const HistoryReducers = (state=initialState, action)=> {
    switch(action.type) {
        case GET_HISTORY_REQUEST:
          return {
              ...state,
              isLoggedIn: true,
          };
          case GET_HISTORY_SUCCESS:
            return {
              ...state,
              isLoggedIn:true,
              allHistory:action.payload
            };
            case GET_HISTORY_FAILURE:
            return {
              ...state,
              isLoggedIn:false,
            }            
        default:
          return state;
      }
}
