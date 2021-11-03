import axios from 'axios';
import {
	VOUCHER_CREATE_SUCCESS,
	VOUCHER_DELETE_SUCCESS,
	VOUCHER_FAIL,
	VOUCHER_FETCH_SUCCESS,
	VOUCHER_REQUEST,
	VOUCHER_UPDATE_SUCCESS,
} from '../constants/VoucherConstans';

export const getVouchers = (query, cb) => async (dispatch) => {
	dispatch({
		type: VOUCHER_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/voucher`
		);

		if (data.success) {
			dispatch({
				type: VOUCHER_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createVouchers = (values, cb) => async (dispatch) => {
	dispatch({
		type: VOUCHER_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/voucher`,
			values
		);

		console.log(data);

		if (data.success) {
			dispatch({
				type: VOUCHER_CREATE_SUCCESS,
				payload: data.voucher,
			});
			if (cb) cb(null, data);
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateVouchers = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: VOUCHER_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/voucher/${id}`,
			values
		);

		if (data.status === 'OK') {
			dispatch({
				type: VOUCHER_UPDATE_SUCCESS,
				payload: data.voucher,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteVouchers = (params, cb) => async (dispatch) => {
	dispatch({
		type: VOUCHER_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/voucher/${params}`
		);

		if (data.status === 'OK') {
			dispatch({
				type: VOUCHER_DELETE_SUCCESS,
				payload: params,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

const dispatchError = (err, dispatch, cb) => {
	console.log(err.response);
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: VOUCHER_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: VOUCHER_FAIL,
			payload: 'Network Error',
		});
	}
};
