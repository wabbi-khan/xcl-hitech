import axios from 'axios';
import { PURCHASE_ORDER_FETCH_REQUEST, PURCHASE_ORDER_FETCH_SUCCESS, PURCHASE_ORDER_FETCH_FAIL, SINGLE_PURCHASE_ORDER_FETCH_REQUEST, SINGLE_PURCHASE_ORDER_FETCH_SUCCESS, SINGLE_PURCHASE_ORDER_FETCH_FAIL} from '../constants/OrderConstant'

export const fetchPurchaseOrderAction = () => async (dispatch) => {
    dispatch({
        type: PURCHASE_ORDER_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/order`)
        
        dispatch({
            type: PURCHASE_ORDER_FETCH_SUCCESS,
            payload: data.orders
        })

    }
    
    catch (err) {
        dispatch({
            type: PURCHASE_ORDER_FETCH_FAIL,
            payload: err
        })

    }
}

export const fetchSinglePurchaseOrderAction = (_id) => async (dispatch) => {
    dispatch({
        type: SINGLE_PURCHASE_ORDER_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/order/${_id}`)
        
        dispatch({
            type: SINGLE_PURCHASE_ORDER_FETCH_SUCCESS,
            payload: data.order
        })

    }
    
    catch (err) {
        dispatch({
            type: SINGLE_PURCHASE_ORDER_FETCH_FAIL,
            payload: err
        })

    }
}