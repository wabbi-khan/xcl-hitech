import axios from 'axios';
import {
	CUSTOMER_COMPLAINT_CREATE_SUCCESS,
	CUSTOMER_COMPLAINT_DELETE_SUCCESS,
	CUSTOMER_COMPLAINT_FAIL,
	CUSTOMER_COMPLAINT_FETCH_SUCCESS,
	CUSTOMER_COMPLAINT_REQUEST,
	CUSTOMER_COMPLAINT_UPDATE_SUCCESS,
} from '../constants/CustomerComplaintConstant';

export const getCustomerComplaint = (query, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_COMPLAINT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/customerComplaint`
		);

		if (data.success) {
			dispatch({
				type: CUSTOMER_COMPLAINT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createCustomerComplaint = (values, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_COMPLAINT_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/customerComplaint`,
			values
		);
		if (data.success) {
			dispatch({
				type: CUSTOMER_COMPLAINT_CREATE_SUCCESS,
				payload: data.customerComplaint,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateCustomerComplaint = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_COMPLAINT_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/customerComplaint/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: CUSTOMER_COMPLAINT_UPDATE_SUCCESS,
				payload: data.customerComplaint,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteCustomerComplaint = (params, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_COMPLAINT_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/customerComplaint/${params}`
		);

		if (data.success) {
			dispatch({
				type: CUSTOMER_COMPLAINT_DELETE_SUCCESS,
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
			type: CUSTOMER_COMPLAINT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: CUSTOMER_COMPLAINT_FAIL,
			payload: 'Network Error',
		});
	}
};
