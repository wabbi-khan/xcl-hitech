import axios from 'axios';
import {
	AUTHORITY_CREATE_SUCCESS,
	AUTHORITY_DELETE_SUCCESS,
	AUTHORITY_FAIL,
	AUTHORITY_FETCH_SUCCESS,
	AUTHORITY_REQUEST,
	AUTHORITY_UPDATE_SUCCESS,
} from '../constants/AuthorityConstant';

export const getAuthorities = (query, cb) => async (dispatch) => {
	dispatch({
		type: AUTHORITY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/authority`
		);

		if (data.success) {
			dispatch({
				type: AUTHORITY_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createAuthorities = (values, cb) => async (dispatch) => {
	dispatch({
		type: AUTHORITY_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/authority`,
			values
		);

		if (data.status === 'OK') {
			dispatch({
				type: AUTHORITY_CREATE_SUCCESS,
				payload: data.authority,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateAuthorities = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: AUTHORITY_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/authority/${id}`,
			values
		);

		if (data.status === 'OK') {
			dispatch({
				type: AUTHORITY_UPDATE_SUCCESS,
				payload: data.authority,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteAuthorities = (params, cb) => async (dispatch) => {
	dispatch({
		type: AUTHORITY_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/authority/${params}`
		);

		if (data.status === 'OK') {
			dispatch({
				type: AUTHORITY_DELETE_SUCCESS,
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
		if (cb) cb(err.response);
		dispatch({
			type: AUTHORITY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: AUTHORITY_FAIL,
			payload: 'Network Error',
		});
	}
};
