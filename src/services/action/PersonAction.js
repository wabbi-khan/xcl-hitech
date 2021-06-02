import axios from 'axios';
import { 
    PERSON_FETCH_REQUEST, 
    PERSON_FETCH_SUCCESS, 
    PERSON_FETCH_FAIL
} 
from '../constants/ContactPerson'

export const fetchPersonAction = () => async (dispatch) => {
    dispatch({
        type: PERSON_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/persons`)
        
        dispatch({
            type: PERSON_FETCH_SUCCESS,
            payload: data.persons
        })

    }
    
    catch (err) {
        dispatch({
            type: PERSON_FETCH_FAIL,
            payload: err
        })

    }
}