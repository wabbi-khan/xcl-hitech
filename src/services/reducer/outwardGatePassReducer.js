import {
    OUTWARD_GATE_PASS_CREATE_SUCCESS,
    OUTWARD_GATE_PASS_DELETE_SUCCESS,
    OUTWARD_GATE_PASS_FAIL,
    OUTWARD_GATE_PASS_FETCH_SUCCESS,
    OUTWARD_GATE_PASS_REQUEST,
    OUTWARD_GATE_PASS_UPDATE_SUCCESS,
} from "../constants/outwardGatePassConstant";

export const outwardGatePassReducer = (state = {
    outwardGatePasses: []
}, action) => {
    switch (action.type) {
        case OUTWARD_GATE_PASS_REQUEST:
            return {
                ...state,
                error: "",
                loading: true,
            };
        case OUTWARD_GATE_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case OUTWARD_GATE_PASS_FETCH_SUCCESS:
            return {
                loading: false,
                error: "",
                outwardGatePasses: action.payload,
            };
        case OUTWARD_GATE_PASS_UPDATE_SUCCESS:
            return {
                loading: false,
                error: "",
                outwardGatePasses: state.outwardGatePasses.map((outwardGatePass) =>
                    outwardGatePass._id === action.payload._id ? action.payload : outwardGatePass
                ),
            };
        case OUTWARD_GATE_PASS_DELETE_SUCCESS:
            return {
                loading: false,
                error: "",
                outwardGatePasses: state.outwardGatePasses.filter(
                    (outwardGatePass) => outwardGatePass._id !== action.payload
                ),
            };
        case OUTWARD_GATE_PASS_CREATE_SUCCESS:
            return {
                error: "",
                loading: false,
                outwardGatePasses: [...state.outwardGatePasses, action.payload],
            };

        default:
            return state;
    }
};