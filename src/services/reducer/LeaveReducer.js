import {
	LEAVE_FAIL,
	LEAVE_REQUEST,
	LEAVE_FETCH_SUCCESS,
	LEAVE_CREATE_SUCCESS,
	LEAVE_UPDATE_SUCCESS,
} from '../constants/LeaveConstant';

export const fetchLeaveReducer = (state = { leaves: [] }, action) => {
	switch (action.type) {
		case LEAVE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case LEAVE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case LEAVE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				leaves: action.payload,
			};
		case LEAVE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				leaves: state.leaves.map((leave) =>
					leave._id === action.payload.leave._id
						? action.payload.leave
						: leave
				),
			};
		case LEAVE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				leaves: [...state.leaves, action.payload],
			};
		default:
			return state;
	}
};
