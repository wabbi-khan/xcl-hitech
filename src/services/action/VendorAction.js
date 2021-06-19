import axios from 'axios';
import {
	VENDOR_REQUEST,
	VENDOR_FAIL,
	VENDOR_FETCH_SUCCESS,
	VENDOR_CREATE_SUCCESS,
	VENDOR_UPDATE_SUCCESS,
	VENDOR_DELETE_SUCCESS,
} from '../constants/VendorConstant';

export const getVendorAction = (query) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/vendor${query ? `?${query}` : ''}`,
		);


		dispatch({
			type: VENDOR_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err);
	}
};

export const createVendorAction = (vendor) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/vendor`,
			vendor,
		);

		console.log(res.data.vendor);

		dispatch({
			type: VENDOR_CREATE_SUCCESS,
			payload: res.data.vendor,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateVendorAction = (id, data) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/vendor/${id}`,
			data,
		);

		console.log(res.data);

		dispatch({
			type: VENDOR_UPDATE_SUCCESS,
			payload: { vendor: res.data.vendor, verifiedMsg: res.data.verifiedMsg },
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteVendorAction = (params) => async (dispatch) => {
	dispatch({
		type: VENDOR_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/vendor/${params}`);

		dispatch({
			type: VENDOR_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response.data.error);
		dispatch({
			type: VENDOR_FAIL,
			payload: err.response.data.error,
		});
	} else {
		console.log(err);
		dispatch({
			type: VENDOR_FAIL,
			payload: 'Network Error',
		});
	}
};
