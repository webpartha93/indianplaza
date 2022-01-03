import {UNKNOWN_ITEM_REQUEST, UNKNOWN_ITEM_SUCCESS, UNKNOWN_ITEM_FAILURE } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';

export const unknownItems = (payload)=> async (dispatch, getState)=> {
    console.log('checkoutAction', payload);
    dispatch({type:UNKNOWN_ITEM_REQUEST});
    
    let data = {
        "apiKey": API_KEY
    }
    try{
        const response = await axios.post(API_URL+'/Unknown-item', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        console.log('checkoutActionresponse', response.data);

        dispatch({
            type:UNKNOWN_ITEM_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:UNKNOWN_ITEM_FAILURE, payload:error.response.data})
    }   
}

