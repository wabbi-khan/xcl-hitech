import {
	USER_CREATE_SUCCESS,
	USER_DELETE_SUCCESS,
	USER_FAIL,
	USER_FETCH_SUCCESS,
	USER_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_LOGOUT,
} from '../constants/UserConstant';

export const getUserReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case USER_LOGOUT:
			return {
				...state,
				user: action.payload,
			};
		case USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: {},
			};
		case USER_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				user: action.payload,
			};
		case USER_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				user: state.user.map((user) =>
					user._id === action.payload._id ? action.payload : user,
				),
			};
		case USER_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				user: state.user.filter((user) => user._id !== action.payload),
			};
		case USER_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				user: action.payload,
			};

		default:
			return state;
	}
};
