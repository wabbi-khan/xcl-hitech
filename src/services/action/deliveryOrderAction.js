import axios from 'axios';
import {
	DELIVERY_ORDER_CREATE_SUCCESS,
	DELIVERY_ORDER_DELETE_SUCCESS,
	DELIVERY_ORDER_FAIL,
	DELIVERY_ORDER_FETCH_SUCCESS,
	DELIVERY_ORDER_REQUEST,
	DELIVERY_ORDER_UPDATE_SUCCESS,
} from '../constants/deliveryOrderConstant';

export const getDeliveryOrders = (query, cb) => async (dispatch) => {
	dispatch({
		type: DELIVERY_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/deliveryOrder`
		);

		if (data.success) {
			dispatch({
				type: DELIVERY_ORDER_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createDeliveryOrders = (values, cb) => async (dispatch) => {
	dispatch({
		type: DELIVERY_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/deliveryOrder`,
			values
		);

		if (data.success) {
			dispatch({
				type: DELIVERY_ORDER_CREATE_SUCCESS,
				payload: data.deliveryOrder,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateDeliveryOrders = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: DELIVERY_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/deliveryOrder/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: DELIVERY_ORDER_UPDATE_SUCCESS,
				payload: data.deliveryOrder,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteDeliveryOrders = (params, cb) => async (dispatch) => {
	dispatch({
		type: DELIVERY_ORDER_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/deliveryOrder/${params}`
		);

		if (data.success) {
			dispatch({
				type: DELIVERY_ORDER_DELETE_SUCCESS,
				payload: params,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: DELIVERY_ORDER_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: DELIVERY_ORDER_FAIL,
			payload: 'Network Error',
		});
	}
};
