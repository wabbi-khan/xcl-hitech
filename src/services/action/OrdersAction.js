import axios from 'axios';
import {
	PURCHASE_ORDER_REQUEST,
	PURCHASE_ORDER_FETCH_SUCCESS,
	PURCHASE_ORDER_FAIL,
	PURCHASE_ORDER_CREATE_SUCCESS,
	// PURCHASE_ORDER_UPDATE_SUCCESS,
	PURCHASE_ORDER_SINGLE_FETCH_SUCCESS,
} from '../constants/OrderConstant';

export const fetchPurchaseOrderAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: PURCHASE_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/order${query ? `?${query}` : ''}`,
		);

		console.log(data);

		if (data.success) {
			dispatch({
				type: PURCHASE_ORDER_FETCH_SUCCESS,
				payload: data.data,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
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

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: PURCHASE_ORDER_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: PURCHASE_ORDER_FAIL,
			payload: 'Network Error',
		});
	}
};
