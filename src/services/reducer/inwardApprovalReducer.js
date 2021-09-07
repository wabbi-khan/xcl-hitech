import {
  INWARDAPPROVAL_CREATE_SUCCESS,
  INWARDAPPROVAL_DELETE_SUCCESS,
  INWARDAPPROVAL_FAIL,
  INWARDAPPROVAL_FETCH_SUCCESS,
  INWARDAPPROVAL_REQUEST,
  INWARDAPPROVAL_UPDATE_SUCCESS,
} from "../constants/InwardApprovalConstant";

export const inwardApprovalReducer = (
  state = { inwardApprovals: [] },
  action
) => {
  switch (action.type) {
    case INWARDAPPROVAL_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case INWARDAPPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INWARDAPPROVAL_FETCH_SUCCESS:
      return {
        loading: false,
        error: "",
        inwardApprovals: action.payload,
      };
    case INWARDAPPROVAL_UPDATE_SUCCESS:
      return {
        loading: false,
        error: "",
        inwardApprovals: state.inwardApprovals.map((inwardApproval) =>
          inwardApproval._id === action.payload._id
            ? action.payload
            : inwardApproval
        ),
      };
    case INWARDAPPROVAL_DELETE_SUCCESS:
      return {
        loading: false,
        error: "",
        inwardApprovals: state.inwardApprovals.filter(
          (inwardApproval) => inwardApproval._id !== action.payload
        ),
      };
    case INWARDAPPROVAL_CREATE_SUCCESS:
      return {
        error: "",
        loading: false,
        inwardApprovals: [...state.inwardApprovals, action.payload],
      };

    default:
      return state;
  }
};
