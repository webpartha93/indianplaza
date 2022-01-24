import { HAND_HELD_SCANNER_REQUEST, HAND_HELD_SCANNER_SUCCESS, HAND_HELD_SCANNER_FAILURE } from '../constants';

const initialState = {
  isLoading: false,
  errorMessage: '',
  handHeldScannerStatus: ""
}

export const HandHeldReducers = (state = initialState, action) => {
  switch (action.type) {
    case HAND_HELD_SCANNER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HAND_HELD_SCANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        handHeldScannerStatus: action.payload
      };
    case HAND_HELD_SCANNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        handHeldScannerStatus: ""
      }
    default:
      return state;
  }
}
