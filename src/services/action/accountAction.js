import axios from 'axios';
import {
	ACCOUNT_CREATE_SUCCESS,
	ACCOUNT_DELETE_SUCCESS,
	ACCOUNT_FAIL,
	ACCOUNT_FETCH_SUCCESS,
	ACCOUNT_REQUEST,
	ACCOUNT_UPDATE_SUCCESS,
} from '../constants/AccountConstant';

export const getAccounts = (query, cb) => async (dispatch) => {
	dispatch({
		type: ACCOUNT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/account`
		);

		if (data.success) {
			dispatch({
				type: ACCOUNT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createAccounts = (values, cb) => async (dispatch) => {
	dispatch({
		type: ACCOUNT_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/account`,
			values
		);

		if (data.success) {
			dispatch({
				type: ACCOUNT_CREATE_SUCCESS,
				payload: data.account,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateAccounts = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: ACCOUNT_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/account/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: ACCOUNT_UPDATE_SUCCESS,
				payload: data.account,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteAccounts = (params, cb) => async (dispatch) => {
	dispatch({
		type: ACCOUNT_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/account/${params}`
		);

		if (data.success) {
			dispatch({
				type: ACCOUNT_DELETE_SUCCESS,
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
			type: ACCOUNT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: ACCOUNT_FAIL,
			payload: 'Network Error',
		});
	}
};
