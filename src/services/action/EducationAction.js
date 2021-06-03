import axios from 'axios';
import {
    EDUCATION_FETCH_REQUEST,
    EDUCATION_FETCH_SUCCESS,
    EDUCATION_FETCH_FAIL,
}
from '../constants/EducationConst'

export const fetchEducationAction = () => async (dispatch) => {
    dispatch({
        type: EDUCATION_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/education`)
        
        dispatch({
            type: EDUCATION_FETCH_SUCCESS,
            payload: data.education
        })

    }
    
    catch (err) {
        dispatch({
            type: EDUCATION_FETCH_FAIL,
            payload: err
        })

    }
}