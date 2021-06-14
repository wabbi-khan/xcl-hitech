import axios from 'axios';
import { 
    CATEGORY_FAIL, 
    CATEGORY_REQUEST, 
    CATEGORY_CREATE_SUCCESS, 
    CATEGORY_FETCH_SUCCESS, 
    CATEGORY_DELETE_SUCCESS, 
    CATEGORY_UPDATE_SUCCESS 
} 
from '../constants/MatCategoryConst';

export const getMaterialCategoryAction = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_REQUEST
    })

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/category`)

        console.log(data)
        dispatch({
            type: CATEGORY_FETCH_SUCCESS,
            payload: data.category,
        })
    }

    catch (err) {
        dispatchError(err, dispatch)
    }
}

export const createMatCategoryAction = (category) => async (dispatch) => {
    dispatch({
        type: CATEGORY_REQUEST
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/category`, category)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: res.data.category,
        })

        // console.log(data);
    } catch (err) {
        dispatchError(err, dispatch)
    }
}

export const updateMatCategoryAction = (id, data) => async (dispatch) => {
    dispatch({
        type: CATEGORY_REQUEST
    })

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/category/${id}`, data)

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: res.data.category,
        })

        // console.log(data);
    } catch (err) {
        dispatchError(err, dispatch)

    }
}

export const deleteMatCategoryAction = (params) => async (dispatch) => {
    dispatch({
        type: CATEGORY_REQUEST
    })

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/category/${params}`)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: params,
        })

        // console.log(data);
    } catch (err) {
        dispatchError(err, dispatch)
    }
}


const dispatchError = (err, dispatch) => {
    if (err.response) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: err.response.data.error
        })
    } else {
        dispatch({
            type: CATEGORY_FAIL,
            payload: 'Network Error'
        })
    }
}