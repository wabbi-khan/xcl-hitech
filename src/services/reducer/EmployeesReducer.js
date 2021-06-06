import { 
    EMPLOYEES_FETCH_FAIL, 
    EMPLOYEES_FETCH_REQUEST, 
    EMPLOYEES_FETCH_SUCCESS 
} 
from "../constants/EmployeesConst";


export const fetchEmployeesReducer = (
    state = { employee: [] },
    action
) => {
    switch (action.type) {
        case EMPLOYEES_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case EMPLOYEES_FETCH_SUCCESS:
            return { 
                loading: false,
                employee: action.payload
            }
        case EMPLOYEES_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}