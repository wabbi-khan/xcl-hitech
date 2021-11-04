import {
	AUTHORITY_CREATE_SUCCESS,
	AUTHORITY_DELETE_SUCCESS,
	AUTHORITY_FAIL,
	AUTHORITY_FETCH_SUCCESS,
	AUTHORITY_REQUEST,
	AUTHORITY_UPDATE_SUCCESS,
} from '../constants/AuthorityConstant';

export const authorityReducer = (state = { authorities: [] }, action) => {
	switch (action.type) {
		case AUTHORITY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case AUTHORITY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case AUTHORITY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				authorities: action.payload,
			};
		case AUTHORITY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				authorities: state.authorities.map((authority) =>
					authority._id === action.payload._id ? action.payload : authority
				),
			};
		case AUTHORITY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				authorities: state.authorities.filter(
					(authority) => authority._id !== action.payload
				),
			};
		case AUTHORITY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				authorities: [action.payload, ...state.authorities],
			};

		default:
			return state;
	}
};
