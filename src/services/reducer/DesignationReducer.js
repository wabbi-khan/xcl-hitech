import { 
    DESIGNATION_FETCH_FAIL,
    DESIGNATION_FETCH_REQUEST, 
    DESIGNATION_FETCH_SUCCESS 
} 
from "../constants/DesignationConst";

export const fetchDesignationsReducer = (
    state = { designations: [] },
    action
) => {
    switch (action.type) {
        case DESIGNATION_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case DESIGNATION_FETCH_SUCCESS:
            return { 
                loading: false,
                designations: action.payload
            }
        case DESIGNATION_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}