import {
	EXECRAT_FAIL,
	EXECRAT_REQUEST,
	EXECRAT_FETCH_SUCCESS,
	EXECRAT_CREATE_SUCCESS,
	EXECRAT_UPDATE_SUCCESS,
	EXECRAT_DELETE_SUCCESS,
} from '../constants/ExecRat';

export const fetchExecRatReducer = (state = { execRat: [] }, action) => {
	switch (action.type) {
		case EXECRAT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case EXECRAT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EXECRAT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				execRat: action.payload,
			};
		case EXECRAT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				execRat: state.execRat.map((execRat) =>
					execRat._id === action.payload.rating._id
						? action.payload.rating
						: execRat
				),
			};
		case EXECRAT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				execRat: [...state.execRat, action.payload],
			};
		case EXECRAT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				execRat: state.execRat.filter(
					(execRat) => execRat._id !== action.payload
				),
			};
		default:
			return state;
	}
};
