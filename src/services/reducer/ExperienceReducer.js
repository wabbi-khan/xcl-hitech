import { 
    EXPERIENCE_FETCH_FAIL, 
    EXPERIENCE_FETCH_REQUEST, 
    EXPERIENCE_FETCH_SUCCESS 
} 
from "../constants/ExperienceConst";


export const fetchExperienceReducer = (
    state = { experience: [] },
    action
) => {
    switch (action.type) {
        case EXPERIENCE_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case EXPERIENCE_FETCH_SUCCESS:
            return { 
                loading: false,
                experience: action.payload
            }
        case EXPERIENCE_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}