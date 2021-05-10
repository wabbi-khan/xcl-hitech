import axios from 'axios';
import { VENDOR_FETCH_REQUEST, VENDOR_FETCH_SUCCESS, VENDOR_FETCH_FAIL} from '../constants/VendorConstant'

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