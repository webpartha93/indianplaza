import {CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE  } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';

export const doCheckout = (payload)=> async (dispatch, getState)=> {
    console.log('checkoutAction', payload);

    dispatch({type:CHECKOUT_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "emp_id": payload.empId,
        "activity": payload.getAllData.activity,
        "delivery_note_number" : payload.getAllData.deliveryNumber,
        "delivery_date" : payload.getAllData.deliverDate,
        "org_id": payload.getAllData.org_id,
        "vendor_id" : payload.getAllData.vendor_id,
        "remarks":payload.remarks !== undefined ? payload.remarks : "",
        "lines":payload.updatedCartItem
    }
    try{
        const response = await axios.post(API_URL+'/staging', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        console.log('checkoutActionresponse', response.data.status);

        dispatch({
            type:CHECKOUT_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:CHECKOUT_FAILURE, payload:error.response.data})
    }   
}

