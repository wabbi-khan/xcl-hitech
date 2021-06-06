import { COMP_CRITERIA_FETCH_FAIL, COMP_CRITERIA_FETCH_REQUEST, COMP_CRITERIA_FETCH_SUCCESS } from "../constants/CriteriaConst";


export const fetchCompCriteriaReducer = (
    state = { criteria: [] },
    action
) => {
    switch (action.type) {
        case COMP_CRITERIA_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case COMP_CRITERIA_FETCH_SUCCESS:
            return { 
                loading: false,
                criteria: action.payload
            }
        case COMP_CRITERIA_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}