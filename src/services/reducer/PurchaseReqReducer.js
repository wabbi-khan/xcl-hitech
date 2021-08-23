import {
	PURCHASE_REQ_CREATE_SUCCESS,
	PURCHASE_REQ_FAIL,
	PURCHASE_REQ_FETCH_SUCCESS,
	PURCHASE_REQ_REQUEST,
	PURCHASE_REQ_UPDATE_SUCCESS,
} from '../constants/PurchaseReqConst';

export const fetchPurchaseReqReducer = (
	state = { purchaseRequisitions: [], purchaseRequisition: {} },
	action,
) => {
	switch (action.type) {
		case PURCHASE_REQ_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case PURCHASE_REQ_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case PURCHASE_REQ_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				purchaseRequisitions: Array.isArray(action.payload) ? action.payload : [],
				purchaseRequisition: Array.isArray(action.payload) ? {} : action.payload,
			};
		case PURCHASE_REQ_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				purchaseRequisitions:
					state.purchaseRequisitions.length === 0
						? []
						: state.purchaseRequisitions.map((purchaseRequisition) =>
								purchaseRequisition._id === action.payload._id
									? action.payload
									: purchaseRequisition,
						  ),
				purchaseRequisition:
					state.purchaseRequisitions.length === 0 ? action.payload : {},
			};
		case PURCHASE_REQ_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				purchaseRequisition: {},
				purchaseRequisitions: [...state.purchaseRequisitions, action.payload],
			};

		default:
			return state;
	}
};
