import {
	DESIGNATION_CREATE_SUCCESS,
	DESIGNATION_DELETE_SUCCESS,
	DESIGNATION_FAIL,
	DESIGNATION_FETCH_SUCCESS,
	DESIGNATION_REQUEST,
	DESIGNATION_UPDATE_SUCCESS,
} from '../constants/DesignationConst';

export const fetchDesignation = (state = { designations: [] }, action) => {
	switch (action.type) {
		case DESIGNATION_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case DESIGNATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DESIGNATION_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				designations: action.payload,
			};
		case DESIGNATION_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				designations: state.designations.map((designation) =>
					designation._id === action.payload._id ? action.payload : designation,
				),
			};
		case DESIGNATION_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				designations: state.designations.filter(
					(designation) => designation._id !== action.payload,
				),
			};
		case DESIGNATION_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				designations: [...state.designations, action.payload],
			};

		default:
			return state;
	}
};
