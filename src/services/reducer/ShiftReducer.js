import {
	SHIFT_FETCH_FAIL,
	SHIFT_FETCH_REQUEST,
	SHIFT_FETCH_SUCCESS,
} from '../constants/ShiftConstant';

export const fetchShiftReducer = (state = { shifts: [] }, action) => {
	switch (action.type) {
		case SHIFT_FETCH_REQUEST:
			return {
				loading: true,
			};
		case SHIFT_FETCH_SUCCESS:
			return {
				loading: false,
				shifts: action.payload,
			};
		case SHIFT_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
