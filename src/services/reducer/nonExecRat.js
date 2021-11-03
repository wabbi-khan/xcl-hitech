import {
	NONEXECRAT_FAIL,
	NONEXECRAT_REQUEST,
	NONEXECRAT_FETCH_SUCCESS,
	NONEXECRAT_CREATE_SUCCESS,
	NONEXECRAT_UPDATE_SUCCESS,
	NONEXECRAT_DELETE_SUCCESS,
} from '../constants/NonExecRat';

export const fetchNonExecRatReducer = (state = { nonExecRat: [] }, action) => {
	switch (action.type) {
		case NONEXECRAT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case NONEXECRAT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NONEXECRAT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecRat: action.payload,
			};
		case NONEXECRAT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecRat: state.nonExecRat.map((nonExecRat) =>
					nonExecRat._id === action.payload.rating._id
						? action.payload.rating
						: nonExecRat
				),
			};
		case NONEXECRAT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				nonExecRat: [...state.nonExecRat, action.payload],
			};
		case NONEXECRAT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecRat: state.nonExecRat.filter(
					(nonExecRat) => nonExecRat._id !== action.payload
				),
			};
		default:
			return state;
	}
};
