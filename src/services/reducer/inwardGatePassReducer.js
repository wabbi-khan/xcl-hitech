import {
    INWARD_GATE_PASS_CREATE_SUCCESS,
    INWARD_GATE_PASS_DELETE_SUCCESS,
    INWARD_GATE_PASS_FAIL,
    INWARD_GATE_PASS_FETCH_SUCCESS,
    INWARD_GATE_PASS_REQUEST,
    INWARD_GATE_PASS_UPDATE_SUCCESS,
} from "../constants/InwardGatePassConstant";

export const inwardGatePassReducer = (state = {
    inwardGatePasses: []
}, action) => {
    switch (action.type) {
        case INWARD_GATE_PASS_REQUEST:
            return {
                ...state,
                error: "",
                loading: true,
            };
        case INWARD_GATE_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case INWARD_GATE_PASS_FETCH_SUCCESS:
            return {
                loading: false,
                error: "",
                inwardGatePasses: action.payload,
            };
        case INWARD_GATE_PASS_UPDATE_SUCCESS:
            return {
                loading: false,
                error: "",
                inwardGatePasses: state.inwardGatePasses.map((inwardGatePass) =>
                    inwardGatePass._id === action.payload._id ? action.payload : inwardGatePass
                ),
            };
        case INWARD_GATE_PASS_DELETE_SUCCESS:
            return {
                loading: false,
                error: "",
                inwardGatePasses: state.inwardGatePasses.filter(
                    (inwardGatePass) => inwardGatePass._id !== action.payload
                ),
            };
        case INWARD_GATE_PASS_CREATE_SUCCESS:
            return {
                error: "",
                loading: false,
                inwardGatePasses: [...state.inwardGatePasses, action.payload],
            };

        default:
            return state;
    }
};