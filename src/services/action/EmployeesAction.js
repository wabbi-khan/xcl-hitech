import axios from 'axios';
import {
    EMPLOYEES_FETCH_REQUEST,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEES_FETCH_FAIL,
}
from '../constants/EmployeesConst'

export const fetchEmployeesAction = () => async (dispatch) => {
    dispatch({
        type: EMPLOYEES_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/employee`)
        
        dispatch({
            type: EMPLOYEES_FETCH_SUCCESS,
            payload: data.employee
        })

    }
    
    catch (err) {
        dispatch({
            type: EMPLOYEES_FETCH_FAIL,
            payload: err
        })

    }
}