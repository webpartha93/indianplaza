import {GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAILURE  } from '../constants';
import axios from "axios";
import { API_URL } from '../../config/constant';

export const getHistory = (payload)=> async (dispatch, getState)=> {
    console.log('asdasdasdasdasd', payload.emp_id)
    dispatch({type:GET_HISTORY_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956",
        "emp_id": payload.emp_id,
    }
    try{
        const response = await axios.post(API_URL+'/shipment-details', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
            }
        })

        //console.log('history', response.data);

        dispatch({
            type:GET_HISTORY_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:GET_HISTORY_FAILURE, payload:error.response.data})
    }   
}

