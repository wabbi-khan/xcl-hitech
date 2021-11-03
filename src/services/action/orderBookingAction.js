import axios from 'axios';
import {
	ORDER_BOOKING_CREATE_SUCCESS,
	ORDER_BOOKING_DELETE_SUCCESS,
	ORDER_BOOKING_FAIL,
	ORDER_BOOKING_FETCH_SUCCESS,
	ORDER_BOOKING_REQUEST,
	ORDER_BOOKING_UPDATE_SUCCESS,
} from '../constants/OrderBookingConstant';

export const getOrderBooking = (query, cb) => async (dispatch) => {
	dispatch({
		type: ORDER_BOOKING_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/orderBooking`
		);

		if (data.success) {
			dispatch({
				type: ORDER_BOOKING_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createOrderBooking = (values, cb) => async (dispatch) => {
	dispatch({
		type: ORDER_BOOKING_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/orderBooking`,
			values
		);

		if (data.success) {
			dispatch({
				type: ORDER_BOOKING_CREATE_SUCCESS,
				payload: data.orderBooking,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateOrderBooking = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: ORDER_BOOKING_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/orderBooking/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: ORDER_BOOKING_UPDATE_SUCCESS,
				payload: data.orderBooking,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteOrderBooking = (params, cb) => async (dispatch) => {
	dispatch({
		type: ORDER_BOOKING_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/orderBooking/${params}`
		);

		if (data.success) {
			dispatch({
				type: ORDER_BOOKING_DELETE_SUCCESS,
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
			type: ORDER_BOOKING_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: ORDER_BOOKING_FAIL,
			payload: 'Network Error',
		});
	}
};
