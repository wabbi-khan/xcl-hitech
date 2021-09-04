import {
  INWARD_CREATE_SUCCESS,
  INWARD_DELETE_SUCCESS,
  INWARD_FAIL,
  INWARD_FETCH_SUCCESS,
  INWARD_REQUEST,
  INWARD_UPDATE_SUCCESS,
} from "../constants/InwardConstant";

export const inwardReducer = (state = { inwards: [] }, action) => {
  switch (action.type) {
    case INWARD_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case INWARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INWARD_FETCH_SUCCESS:
      return {
        loading: false,
        error: "",
        inwards: action.payload,
      };
    case INWARD_UPDATE_SUCCESS:
      return {
        loading: false,
        error: "",
        inwards: state.inwards.map((inward) =>
          inward._id === action.payload._id ? action.payload : inward
        ),
      };
    case INWARD_DELETE_SUCCESS:
      return {
        loading: false,
        error: "",
        inwards: state.inwards.filter(
          (inward) => inward._id !== action.payload
        ),
      };
    case INWARD_CREATE_SUCCESS:
      return {
        error: "",
        loading: false,
        inwards: [...state.inwards, action.payload],
      };

    default:
      return state;
  }
};
