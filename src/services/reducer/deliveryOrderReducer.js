import {
	DELIVERY_ORDER_CREATE_SUCCESS,
	DELIVERY_ORDER_DELETE_SUCCESS,
	DELIVERY_ORDER_FAIL,
	DELIVERY_ORDER_FETCH_SUCCESS,
	DELIVERY_ORDER_REQUEST,
	DELIVERY_ORDER_UPDATE_SUCCESS,
} from '../constants/deliveryOrderConstant';

export const deliveryOrderReducer = (
	state = { deliveryOrders: [] },
	action,
) => {
	switch (action.type) {
		case DELIVERY_ORDER_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case DELIVERY_ORDER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELIVERY_ORDER_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				deliveryOrders: action.payload,
			};
		case DELIVERY_ORDER_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				deliveryOrders: state.deliveryOrders.map((deliveryOrder) =>
					deliveryOrder._id === action.payload._id
						? action.payload
						: deliveryOrder,
				),
			};
		case DELIVERY_ORDER_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				deliveryOrders: state.deliveryOrders.filter(
					(deliveryOrder) => deliveryOrder._id !== action.payload,
				),
			};
		case DELIVERY_ORDER_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				deliveryOrders: [...state.deliveryOrders, action.payload],
			};

		default:
			return state;
	}
};
