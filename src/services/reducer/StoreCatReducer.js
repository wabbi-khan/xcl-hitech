import {
	STORE_CATEGORY_CREATE_SUCCESS,
	STORE_CATEGORY_DELETE_SUCCESS,
	STORE_CATEGORY_FAIL,
	STORE_CATEGORY_FETCH_SUCCESS,
	STORE_CATEGORY_REQUEST,
	STORE_CATEGORY_UPDATE_SUCCESS,
} from '../constants/StoreCategoryConst';

export const fetchStoreCategory = (state = { storeCategories: [] }, action) => {
	switch (action.type) {
		case STORE_CATEGORY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case STORE_CATEGORY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case STORE_CATEGORY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				storeCategories: action.payload,
			};
		case STORE_CATEGORY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				storeCategories: state.storeCategories.map((storeCategory) =>
					storeCategory._id === action.payload.category._id
						? action.payload
						: storeCategory
				),
			};
		case STORE_CATEGORY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				storeCategories: state.storeCategories.filter(
					(storeCategory) => storeCategory._id !== action.payload
				),
			};
		case STORE_CATEGORY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				storeCategories: [action.payload, ...state.storeCategories],
			};

		default:
			return state;
	}
};
