import {
	CATEGORY_FAIL,
	CATEGORY_REQUEST,
	CATEGORY_FETCH_SUCCESS,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_UPDATE_SUCCESS,
} from '../constants/MatCategoryConst';

export const fetchCategoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case CATEGORY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case CATEGORY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CATEGORY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				categories: action.payload,
			};
		case CATEGORY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				categories: state.categories.map((category) =>
					category._id === action.payload._id ? action.payload : category,
				),
			};
		case CATEGORY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				categories: state.categories.filter(
					(category) => category._id !== action.payload,
				),
			};
		case CATEGORY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				categories: [action.payload, ...state.categories],
			};

		default:
			return state;
	}
};
