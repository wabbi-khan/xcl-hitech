import { CATEGORY_FETCH_FAIL, CATEGORY_FETCH_REQUEST, CATEGORY_FETCH_SUCCESS } from "../constants/MatCategoryConst";


export const fetchCategoryReducer = (
    state = { categories: [] },
    action
) => {
    switch (action.type) {
        case CATEGORY_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case CATEGORY_FETCH_SUCCESS:
            return { 
                loading: false,
                categories: action.payload
            }
        case CATEGORY_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}