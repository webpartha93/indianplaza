import { ALL_BRANCHES_REQUEST, ALL_BRANCHES_SUCCESS, ALL_BRANCHES_FAILURE, ALL_SUPPLIER_REQUEST, ALL_SUPPLIER_SUCCESS, ALL_SUPPLIER_FAILURE, SCAN_PRODUCT_REQUEST, SCAN_PRODUCT_SUCCESS, SCAN_PRODUCT_FAILURE, PRODUCT_INFO_REQUEST, PRODUCT_INFO_SUCCESS, PRODUCT_INFO_FAILURE, SEARCH_SUPPLIER_REQUEST, SEARCH_SUPPLIER_SUCCESS, SEARCH_SUPPLIER_FAILURE, ASSIGN_BARCODE_REQUEST, ASSIGN_BARCODE_SUCCESS, ASSIGN_BARCODE_FAILURE } from '../constants';
import axios from "axios";
import { API_URL, API_KEY, BEARER_KEY } from '../../config/constant';


export const allBranch = (payload)=> async (dispatch, getState)=> {
    console.log('empTDD', payload);

    dispatch({type:ALL_BRANCHES_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "emp_id" : payload.emp_id
    }
    try{
        const response = await axios.post(API_URL+'/branches', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
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
        "apiKey": API_KEY
    }
    try{
        const response = await axios.post(API_URL+'/suppliers', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
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

export const searchSupplier = (payload)=> async (dispatch, getState)=> {

    dispatch({type:SEARCH_SUPPLIER_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "key_word" : payload
    }
    try{
        const response = await axios.post(API_URL+'/search-suppliers', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        dispatch({
            type:SEARCH_SUPPLIER_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:SEARCH_SUPPLIER_FAILURE, payload:error.response.data})
    }   
}

export const afterScanProduct = (payload)=> async (dispatch, getState)=> {

    dispatch({type:SCAN_PRODUCT_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "barcode":payload
    }
    try{
        const response = await axios.post(API_URL+'/scan-barcode', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
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
        "apiKey": API_KEY,
        "product_id" : payload
    }
    try{
        const response = await axios.post(API_URL+'/product', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
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


export const assignBarCode = (payload)=> async (dispatch, getState)=> {
    console.log('assignbarcode data',payload)
    dispatch({type:ASSIGN_BARCODE_REQUEST});
    
    let data = {
        "apiKey": API_KEY,
        "barcode" : payload.barcode,
        "product_id": payload.product_id
    }
    try{
        const response = await axios.post(API_URL+'/assign-barcode', data,{
            headers:{
                'content-type': 'application/json',                                    
                'Authorization': BEARER_KEY
            }
        })

        dispatch({
            type:ASSIGN_BARCODE_SUCCESS,
            payload:response.data
        });

    }catch(error){
        dispatch({type:ASSIGN_BARCODE_FAILURE, payload:error.response.data})
    }   
}
