import { ALL_BRANCHES_REQUEST, ALL_BRANCHES_SUCCESS, ALL_BRANCHES_FAILURE, ALL_SUPPLIER_REQUEST, ALL_SUPPLIER_SUCCESS, ALL_SUPPLIER_FAILURE, SCAN_PRODUCT_REQUEST, SCAN_PRODUCT_SUCCESS, SCAN_PRODUCT_FAILURE, PRODUCT_INFO_REQUEST, PRODUCT_INFO_SUCCESS, PRODUCT_INFO_FAILURE } from '../constants';
import axios from "axios";
import { API_URL } from '../../config/constant';


export const allBranch = (payload)=> async (dispatch, getState)=> {
    console.log('empTDD', payload);

    dispatch({type:ALL_BRANCHES_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956",
        "emp_id" : payload.emp_id
    }
    try{
        const response = await axios.post(API_URL+'/branches', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
            }
        })

        dispatch({
            type:ALL_BRANCHES_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:ALL_BRANCHES_FAILURE, payload:error.response.data})
    }   
}

export const allSupplier = (payload)=> async (dispatch, getState)=> {

    dispatch({type:ALL_SUPPLIER_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956"
    }
    try{
        const response = await axios.post(API_URL+'/suppliers', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
            }
        })

        dispatch({
            type:ALL_SUPPLIER_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:ALL_SUPPLIER_FAILURE, payload:error.response.data})
    }   
}

export const afterScanProduct = (payload)=> async (dispatch, getState)=> {

    dispatch({type:SCAN_PRODUCT_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956",
        "barcode":payload
    }
    try{
        const response = await axios.post(API_URL+'/scan-barcode', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
            }
        })

        dispatch({
            type:SCAN_PRODUCT_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:SCAN_PRODUCT_FAILURE, payload:error.response.data})
    }   
}

export const getProductInfo = (payload)=> async (dispatch, getState)=> {

    dispatch({type:PRODUCT_INFO_REQUEST});
    
    let data = {
        "apiKey": "866250ac55306374e9499faa21ce5956",
        "product_id" : payload
    }
    try{
        const response = await axios.post(API_URL+'/product', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWV0cmljc2VycC5uZXRcL21ldHJpY3NhcGlcL3B1YmxpY1wvYXBpXC9sb2dpbi11c2VyIiwiaWF0IjoxNjE5OTgwMTU1LCJuYmYiOjE2MTk5ODAxNTUsImp0aSI6IlliZnFoajdrRFZwY1AwbloiLCJzdWIiOjU0LCJhY2Nlc3NfdG9rZW4iOm51bGx9.Lh0_WsV8ohTnRIBfy1KM0r1Qvr2xhtypyAXXEb7xjWQ'
            }
        })

        dispatch({
            type:PRODUCT_INFO_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:PRODUCT_INFO_FAILURE, payload:error.response.data})
    }   
}

