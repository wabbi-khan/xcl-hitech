import {
	RESPONSIBILITY_CREATE_SUCCESS,
	RESPONSIBILITY_DELETE_SUCCESS,
	RESPONSIBILITY_FAIL,
	RESPONSIBILITY_FETCH_SUCCESS,
	RESPONSIBILITY_REQUEST,
	RESPONSIBILITY_UPDATE_SUCCESS,
} from '../constants/ResponsibilityConstant';

export const responsibilityReducer = (
	state = { responsibilities: [] },
	action,
) => {
	switch (action.type) {
		case RESPONSIBILITY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case RESPONSIBILITY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case RESPONSIBILITY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				responsibilities: action.payload,
			};
		case RESPONSIBILITY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				responsibilities: state.responsibilities.map((responsibility) =>
					responsibility._id === action.payload._id
						? action.payload
						: responsibility,
				),
			};
		case RESPONSIBILITY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				responsibilities: state.responsibilities.filter(
					(responsibility) => responsibility._id !== action.payload,
				),
			};
		case RESPONSIBILITY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				responsibilities: [...state.responsibilities, action.payload],
			};

		default:
			return state;
	}
};
