import { 
    DEPARTMENT_FETCH_FAIL,
    DEPARTMENT_FETCH_REQUEST, 
    DEPARTMENT_FETCH_SUCCESS, 
} 
from "../constants/DepartmentConst";


export const fetchDepartmentsReducer = (
    state = { departments: [] },
    action
) => {
    switch (action.type) {
        case DEPARTMENT_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case DEPARTMENT_FETCH_SUCCESS:
            return { 
                loading: false,
                departments: action.payload
            }
        case DEPARTMENT_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}