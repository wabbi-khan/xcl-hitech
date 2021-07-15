import {
	PURCHASE_ORDER_CREATE_SUCCESS,
	PURCHASE_ORDER_FAIL,
	PURCHASE_ORDER_FETCH_SUCCESS,
	PURCHASE_ORDER_REQUEST,
	PURCHASE_ORDER_UPDATE_SUCCESS,
	PURCHASE_ORDER_SINGLE_FETCH_SUCCESS,
} from '../constants/OrderConstant';

export const fetchPurchaseOrderReducer = (
	state = { orders: [], order: {} },
	action,
) => {
	switch (action.type) {
		case PURCHASE_ORDER_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case PURCHASE_ORDER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case PURCHASE_ORDER_SINGLE_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				order: action.payload,
			};
		case PURCHASE_ORDER_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				orders: action.payload,
			};
		case PURCHASE_ORDER_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				orders: state.orders.map((order) =>
					order._id === action.payload._id ? action.payload : order,
				),
			};
		case PURCHASE_ORDER_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				orders: [...state.orders, action.payload],
			};

		default:
			return state;
	}
};
