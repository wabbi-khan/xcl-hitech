import axios from 'axios';
import {
    EXPERIENCE_FETCH_REQUEST,
    EXPERIENCE_FETCH_SUCCESS,
    EXPERIENCE_FETCH_FAIL
}
from '../constants/ExperienceConst'

export const fetchExperienceAction = () => async (dispatch) => {
    dispatch({
        type: EXPERIENCE_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/experience`)
        
        dispatch({
            type: EXPERIENCE_FETCH_SUCCESS,
            payload: data.experience
        })

    }
    
    catch (err) {
        dispatch({
            type: EXPERIENCE_FETCH_FAIL,
            payload: err
        })

    }
}