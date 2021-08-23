import {
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_FAIL,
	PRODUCT_FETCH_SUCCESS,
	PRODUCT_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/ProductsConst';

export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case PRODUCT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				products: action.payload,
			};
		case PRODUCT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				products: state.products.map((product) =>
					product._id === action.payload._id ? action.payload : product,
				),
			};
		case PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				products: state.products.filter(
					(product) => product._id !== action.payload,
				),
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				products: [...state.products, action.payload],
			};

		default:
			return state;
	}
};
