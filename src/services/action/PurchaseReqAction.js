import axios from 'axios';
import { SINGLE_PURCHASE_ORDER_FETCH_REQUEST } from '../constants/OrderConstant';
import { 
    REQ_FETCH_FAIL, 
    REQ_FETCH_REQUEST, 
    REQ_FETCH_SUCCESS, 
    SINGLE_REQ_FETCH_FAIL, 
    SINGLE_REQ_FETCH_SUCCESS
}
from '../constants/PurchaseReqConst'

export const fetchRequisitionAction = (isComplete) => async (dispatch) => {
    dispatch({
        type: REQ_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/request?isComplete=${isComplete}`)
        // console.log(data);

        dispatch({
            type: REQ_FETCH_SUCCESS,
            payload: data.requests
        })

    }
    
    catch (err) {
        dispatch({
            type: REQ_FETCH_FAIL,
            payload: err
        })

    }
}

export const fetchSingleRequisitionAction = (id) => async (dispatch) => {
    dispatch({
        type: SINGLE_PURCHASE_ORDER_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/request/${id}`)

        dispatch({
            type: SINGLE_REQ_FETCH_SUCCESS,
            payload: data.request
        })

    }
    
    catch (err) {
        dispatch({
            type: SINGLE_REQ_FETCH_FAIL,
            payload: err
        })

    }
}

// export const fetchCompletePurchaseReqAction = () => async (dispatch) => {
//     dispatch({
//         type: COMPLETE_PURCHASE_REQ_FETCH_REQUEST
//     })
    
//     try {
//         const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product`)
//         console.log(data);

//         dispatch({
//             type: COMPLETE_PURCHASE_REQ_FETCH_SUCCESS,
//             payload: data.products
//         })

//     }
    
//     catch (err) {
//         dispatch({
//             type: COMPLETE_PURCHASE_REQ_FETCH_FAIL,
//             payload: err
//         })

//     }
// }