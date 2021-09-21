import {
    MATERIAL_FAIL,
    MATERIAL_REQUEST,
    MATERIAL_FETCH_SUCCESS,
    MATERIAL_CREATE_SUCCESS,
    MATERIAL_DELETE_SUCCESS,
    MATERIAL_UPDATE_SUCCESS,
} from '../constants/MaterialConst';

export const fetchMaterialReducer = (state = { materials: [] }, action) => {
    switch (action.type) {
        case MATERIAL_REQUEST:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case MATERIAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case MATERIAL_FETCH_SUCCESS:
            return {
                loading: false,
                error: '',
                materials: action.payload,
            };
        case MATERIAL_UPDATE_SUCCESS:
            return {
                loading: false,
                error: '',
                materials: state.materials.map((material) =>
                    material._id === action.payload._id ? action.payload : material,
                ),
            };
        case MATERIAL_DELETE_SUCCESS:
            return {
                loading: false,
                error: '',
                materials: state.materials.filter(
                    (material) => material._id !== action.payload,
                ),
            };
        case MATERIAL_CREATE_SUCCESS:
            return {
                error: '',
                loading: false,
                materials: [action.payload, ...state.materials, ],
            };

        default:
            return state;
    }
};