import axios from 'axios';
import {
    SKILLS_FETCH_REQUEST,
    SKILLS_FETCH_SUCCESS,
    SKILLS_FETCH_FAIL
}
from '../constants/SkillsConst'

export const fetchSkillsAction = () => async (dispatch) => {
    dispatch({
        type: SKILLS_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/skills`)
        
        dispatch({
            type: SKILLS_FETCH_SUCCESS,
            payload: data.skills
        })

    }
    
    catch (err) {
        dispatch({
            type: SKILLS_FETCH_FAIL,
            payload: err
        })

    }
}