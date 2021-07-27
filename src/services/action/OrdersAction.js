import axios from 'axios';
import {
	PURCHASE_ORDER_REQUEST,
	PURCHASE_ORDER_FETCH_SUCCESS,
	PURCHASE_ORDER_FAIL,
	PURCHASE_ORDER_CREATE_SUCCESS,
	// PURCHASE_ORDER_UPDATE_SUCCESS,
	PURCHASE_ORDER_SINGLE_FETCH_SUCCESS,
} from '../constants/OrderConstant';

export const fetchPurchaseOrderAction = (query) => async (dispatch) => {
	dispatch({
		type: PURCHASE_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/order${query ? `?${query}` : ''}`,
		);

		console.log(data);

		dispatch({
			type: PURCHASE_ORDER_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const fetchSinglePurchaseOrderAction = (_id) => async (dispatch) => {
	dispatch({
		type: PURCHASE_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/order/id/${_id}`,
		);

		console.log(data);
		dispatch({
			type: PURCHASE_ORDER_SINGLE_FETCH_SUCCESS,
			payload: data.order,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createPurchaseOrderAction =
	(purchaseOrder) => async (dispatch) => {
		dispatch({
			type: PURCHASE_ORDER_REQUEST,
		});

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/order`,
				purchaseOrder,
			);

			console.log(res.data.order);

			dispatch({
				type: PURCHASE_ORDER_CREATE_SUCCESS,
				payload: res.data.order,
			});
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response.data.error);
		dispatch({
			type: PURCHASE_ORDER_FAIL,
			payload: err.response.data.error,
		});
	} else {
		console.log(err);
		dispatch({
			type: PURCHASE_ORDER_FAIL,
			payload: 'Network Error',
		});
	}
};
