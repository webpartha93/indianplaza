import { VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE, LOGOUT } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';


export const doVerify = (payload)=> async (dispatch, getState)=> {
    //console.log(payload);

    dispatch({type:VERIFY_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "emp_id" : payload.empid,
        "emp_otp": payload.otp
    }
    try{
        const response = await axios.post(API_URL+'/verify-otp', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })
       //console.log('verify', response.data.data);

        dispatch({
            type:VERIFY_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:VERIFY_FAILURE, payload:error.response.data})
    }   
}

export const doLogout = () => async (dispatch, getState) => {
    dispatch({type:LOGOUT});
}