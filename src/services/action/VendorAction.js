import axios from 'axios';
import {
	VENDOR_REQUEST,
	VENDOR_FAIL,
	VENDOR_FETCH_SUCCESS,
	VENDOR_CREATE_SUCCESS,
	VENDOR_UPDATE_SUCCESS,
	VENDOR_DELETE_SUCCESS,
} from '../constants/VendorConstant';

export const getVendorAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/vendor?sort=name${
				query ? `&${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: VENDOR_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb(null, data.data);
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createVendorAction = (vendor, cb) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/vendor`,
			vendor
		);

		if (data.success) {
			dispatch({
				type: VENDOR_CREATE_SUCCESS,
				payload: data.vendor,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateVendorAction = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/vendor/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: VENDOR_UPDATE_SUCCESS,
				payload: { vendor: data.vendor },
			});
			if (cb) cb(null, data.vendorVerified);
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteVendorAction = (params, cb) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/vendor/${params}`
		);

		if (data.success) {
			dispatch({
				type: VENDOR_DELETE_SUCCESS,
				payload: params,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: VENDOR_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: VENDOR_FAIL,
			payload: 'Network Error',
		});
	}
};
