import axios from 'axios';
import { VENDOR_FETCH_REQUEST, 
        VENDOR_FETCH_SUCCESS, 
        VENDOR_FETCH_FAIL, 
        NON_VERIFY_VENDOR_FETCH_REQUEST, 
        NON_VERIFY_VENDOR_FETCH_SUCCESS, 
        NON_VERIFY_VENDOR_FETCH_FAIL,
        APPSUPPLIST_FETCH_REQUEST,
        APPSUPPLIST_FETCH_SUCCESS,
        APPSUPPLIST_FETCH_FAIL
    } 
from '../constants/VendorConstant'

export const getVendorAction = () => async (dispatch) => {
    dispatch({
        type: VENDOR_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/vendor`)

        dispatch({
            type: VENDOR_FETCH_SUCCESS,
            payload: data.vendor,
        })

    }
    
    catch (err) {
        dispatch({
            type: VENDOR_FETCH_FAIL,
            payload: err
        })

    }
}

export const getNonVerifiedVendorAction = () => async (dispatch) => {
    dispatch({
        type: NON_VERIFY_VENDOR_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/non-verified`)

        dispatch({
            type: NON_VERIFY_VENDOR_FETCH_SUCCESS,
            payload: data.vendor,
        })

    }
    
    catch (err) {
        dispatch({
            type: NON_VERIFY_VENDOR_FETCH_FAIL,
            payload: err
        })

    }
}

export const appSuppListAction = () => async (dispatch) => {
    dispatch({
        type: APPSUPPLIST_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/verified`)
        console.log(data);
        
        dispatch({
            type: APPSUPPLIST_FETCH_SUCCESS,
            payload: data.vendor,
        })
    }
    catch (err) {
        dispatch({
            type: APPSUPPLIST_FETCH_FAIL,
            payload: err
        })

    }
}