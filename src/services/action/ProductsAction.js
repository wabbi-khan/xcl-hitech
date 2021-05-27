import axios from 'axios';
import { PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_SUCCESS, PRODUCTS_FETCH_FAIL } from '../constants/ProductsConst'


export const fetchProductsAction = () => async (dispatch) => {
    dispatch({
        type: PRODUCTS_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product`)

        dispatch({
            type: PRODUCTS_FETCH_SUCCESS,
            payload: data.products
        })

    }
    
    catch (err) {
        dispatch({
            type: PRODUCTS_FETCH_FAIL,
            payload: err
        })

    }
}