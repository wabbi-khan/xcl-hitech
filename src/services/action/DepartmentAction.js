import axios from 'axios';
import {
    DEPARTMENT_FETCH_REQUEST,
    DEPARTMENT_FETCH_SUCCESS,
    DEPARTMENT_FETCH_FAIL
}
from '../constants/DepartmentConst'

export const fetchDepartmentsAction = () => async (dispatch) => {
    dispatch({
        type: DEPARTMENT_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/department`)

        dispatch({
            type: DEPARTMENT_FETCH_SUCCESS,
            payload: data.departments
        })

    }
    
    catch (err) {
        dispatch({
            type: DEPARTMENT_FETCH_FAIL,
            payload: err
        })

    }
}