import { 
    EDUCATION_FETCH_FAIL, 
    EDUCATION_FETCH_REQUEST, 
    EDUCATION_FETCH_SUCCESS 
} 
from "../constants/EducationConst";


export const fetchEducationReducer = (
    state = { education: [] },
    action
) => {
    switch (action.type) {
        case EDUCATION_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case EDUCATION_FETCH_SUCCESS:
            return { 
                loading: false,
                education: action.payload
            }
        case EDUCATION_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}