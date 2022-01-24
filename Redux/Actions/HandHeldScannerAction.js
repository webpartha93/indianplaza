import { HAND_HELD_SCANNER_REQUEST, HAND_HELD_SCANNER_SUCCESS, HAND_HELD_SCANNER_FAILURE } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';

export const handHeldScannerAction = (payload)=> async (dispatch, getState)=> {
    console.log('checkoutAction', payload);
    dispatch({type:HAND_HELD_SCANNER_REQUEST});
    
    let data = {
        "apiKey": API_KEY
    }
    try{
        const response = await axios.post(API_URL+'/handheld-scanner', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        //console.log('status', response.data.data);

        dispatch({
            type:HAND_HELD_SCANNER_SUCCESS,
            payload:response.data.data.handheld_Scanner
        });

    }catch(error){
        dispatch({type:HAND_HELD_SCANNER_FAILURE, payload:error.response.data})
    }   
}

