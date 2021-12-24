import {CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE  } from '../constants';
import axios from "axios";
import { API_URL } from '../../config/constant';

export const doCheckout = (payload)=> async (dispatch, getState)=> {
    console.log('checkoutAction', payload);

    dispatch({type:CHECKOUT_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956",
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
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
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

