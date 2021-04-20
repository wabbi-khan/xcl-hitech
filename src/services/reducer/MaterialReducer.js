import { MATERIAL_FETCH_FAIL, MATERIAL_FETCH_REQUEST, MATERIAL_FETCH_SUCCESS } from "../constants/MaterialConst";

export const fetchMaterialReducer = (
    state = { materials: [] },
    action
) => {
    switch (action.type) {
        case MATERIAL_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case MATERIAL_FETCH_SUCCESS:
            return { 
                loading: false,
                materials: action.payload
            }
        case MATERIAL_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}