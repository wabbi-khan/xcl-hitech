import axios from 'axios';
import {
	CUSTOMER_FEEDBACK_CREATE_SUCCESS,
	CUSTOMER_FEEDBACK_DELETE_SUCCESS,
	CUSTOMER_FEEDBACK_FAIL,
	CUSTOMER_FEEDBACK_FETCH_SUCCESS,
	CUSTOMER_FEEDBACK_REQUEST,
	CUSTOMER_FEEDBACK_UPDATE_SUCCESS,
} from '../constants/CustomerFeedbackConstant';

export const getCustomerFeedback = (query, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_FEEDBACK_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/customerFeedback`
		);

		console.log(data);

		if (data.success) {
			dispatch({
				type: CUSTOMER_FEEDBACK_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createCustomerFeedback = (values, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_FEEDBACK_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/customerFeedback`,
			values
		);

		console.log(data);

		if (data.success) {
			dispatch({
				type: CUSTOMER_FEEDBACK_CREATE_SUCCESS,
				payload: data.customerFeedback,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateCustomerFeedback = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_FEEDBACK_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/customerFeedback/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: CUSTOMER_FEEDBACK_UPDATE_SUCCESS,
				payload: data.customerFeedback,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteCustomerFeedback = (params, cb) => async (dispatch) => {
	dispatch({
		type: CUSTOMER_FEEDBACK_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/customerFeedback/${params}`
		);

		if (data.success) {
			dispatch({
				type: CUSTOMER_FEEDBACK_DELETE_SUCCESS,
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
		console.log(err.response);
		if (cb) cb(err.response.data.error);
		dispatch({
			type: CUSTOMER_FEEDBACK_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		console.log(err);
		dispatch({
			type: CUSTOMER_FEEDBACK_FAIL,
			payload: 'Network Error',
		});
	}
};
