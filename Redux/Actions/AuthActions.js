import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';


export const doLogin = (payload)=> async (dispatch, getState)=> {
    console.log(payload);
    dispatch({type:LOGIN_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "access_code":payload     
    }
    try{
        const response = await axios.post(API_URL+'/login-employee', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })
       console.log('loginData', response.data);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:LOGIN_FAILURE, payload:error.response.data})
    }   
}