import axios from 'axios';
import {
	RESPONSIBILITY_CREATE_SUCCESS,
	RESPONSIBILITY_DELETE_SUCCESS,
	RESPONSIBILITY_FAIL,
	RESPONSIBILITY_FETCH_SUCCESS,
	RESPONSIBILITY_REQUEST,
	RESPONSIBILITY_UPDATE_SUCCESS,
} from '../constants/ResponsibilityConstant';

export const getResponsibilities = (query, cb) => async (dispatch) => {
	dispatch({
		type: RESPONSIBILITY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/responsibility`
		);

		if (data.success) {
			dispatch({
				type: RESPONSIBILITY_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createResponsibilities = (values, cb) => async (dispatch) => {
	dispatch({
		type: RESPONSIBILITY_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/responsibility`,
			values
		);

		if (data.success) {
			dispatch({
				type: RESPONSIBILITY_CREATE_SUCCESS,
				payload: data.responsibility,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateResponsibilities = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: RESPONSIBILITY_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/responsibility/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: RESPONSIBILITY_UPDATE_SUCCESS,
				payload: data.responsibility,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteResponsibilities = (params, cb) => async (dispatch) => {
	dispatch({
		type: RESPONSIBILITY_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/responsibility/${params}`
		);

		if (data.success) {
			dispatch({
				type: RESPONSIBILITY_DELETE_SUCCESS,
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
			type: RESPONSIBILITY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: RESPONSIBILITY_FAIL,
			payload: 'Network Error',
		});
	}
};
