import { 
    STORE_CAT_FETCH_FAIL, 
    STORE_CAT_FETCH_REQUEST, 
    STORE_CAT_FETCH_SUCCESS 
} 
from "../constants/StoreCategoryConst";


export const fetchStoreCatReducer = (
    state = { category: [] },
    action
) => {
    switch (action.type) {
        case STORE_CAT_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case STORE_CAT_FETCH_SUCCESS:
            return { 
                loading: false,
                category: action.payload
            }
        case STORE_CAT_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}