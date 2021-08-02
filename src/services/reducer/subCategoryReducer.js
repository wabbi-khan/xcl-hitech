import {
	SUB_CATEGORY_CREATE_SUCCESS,
	SUB_CATEGORY_DELETE_SUCCESS,
	SUB_CATEGORY_FAIL,
	SUB_CATEGORY_FETCH_SUCCESS,
	SUB_CATEGORY_REQUEST,
	SUB_CATEGORY_UPDATE_SUCCESS,
} from '../constants/SubCategoryConstant';

export const subCategoryReducer = (state = { subCategories: [] }, action) => {
	switch (action.type) {
		case SUB_CATEGORY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case SUB_CATEGORY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case SUB_CATEGORY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				subCategories: action.payload,
			};
		case SUB_CATEGORY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				subCategories: state.subCategories.map((subCategory) =>
					subCategory._id === action.payload._id ? action.payload : subCategory,
				),
			};
		case SUB_CATEGORY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				subCategories: state.subCategories.filter(
					(subCategory) => subCategory._id !== action.payload,
				),
			};
		case SUB_CATEGORY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				subCategories: [...state.subCategories, action.payload],
			};

		default:
			return state;
	}
};
