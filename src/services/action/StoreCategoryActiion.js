import axios from 'axios';
import {
    STORE_CAT_FETCH_REQUEST,
    STORE_CAT_FETCH_SUCCESS,
    STORE_CAT_FETCH_FAIL
}
from '../constants/StoreCategoryConst'

export const fetchStoreCatAction = () => async (dispatch) => {
    dispatch({
        type: STORE_CAT_FETCH_REQUEST
    })

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/store-category`)

        dispatch({
            type: STORE_CAT_FETCH_SUCCESS,
            payload: data.category
        })

    }

    catch (err) {
        dispatch({
            type: STORE_CAT_FETCH_FAIL,
            payload: err
        })

    }
}