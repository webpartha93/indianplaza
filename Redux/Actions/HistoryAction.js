import {GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE, GET_HISTORY_DETAILS_REQUEST, GET_HISTORY_DETAILS_SUCCESS, GET_HISTORY_DETAILS_FAILURE } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY  } from '../../config/constant';

export const getHistory = (payload)=> async (dispatch, getState)=> {
    console.log('asdasdasdasdasd', payload.emp_id)
    dispatch({type:GET_HISTORY_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "emp_id": payload.emp_id,
    }
    try{
        const response = await axios.post(API_URL+'/all-shipment', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        //console.log('history', response.data.data);

        dispatch({
            type:GET_HISTORY_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:GET_HISTORY_FAILURE, payload:error.response.data})
    }   
}

export const getHistoryDetails = (payload)=> async (dispatch, getState)=> {
    console.log('sadasd', payload);
    dispatch({type:GET_HISTORY_DETAILS_REQUEST});
    
    let data = {
        "apiKey": API_KEY
    }
    try{
        const response = await axios.post(API_URL+`/shipment-details/${payload}`, data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        console.log('history', response.data);

        dispatch({
            type:GET_HISTORY_DETAILS_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:GET_HISTORY_DETAILS_FAILURE, payload:error.response.data})
    }   
}
