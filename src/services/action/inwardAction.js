import axios from 'axios';
import {
	INWARD_CREATE_SUCCESS,
	INWARD_DELETE_SUCCESS,
	INWARD_FAIL,
	INWARD_FETCH_SUCCESS,
	INWARD_REQUEST,
	INWARD_UPDATE_SUCCESS,
} from '../constants/InwardConstant';

export const getInwards = (query, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/inward`
		);

		if (data.success) {
			dispatch({
				type: INWARD_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createInwards = (values, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/inward`,
			values
		);

		if (data.success) {
			dispatch({
				type: INWARD_CREATE_SUCCESS,
				payload: data.inward,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateInwards = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/inward/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: INWARD_UPDATE_SUCCESS,
				payload: data.inward,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteInwards = (params, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/inward/${params}`
		);

		if (data.success) {
			dispatch({
				type: INWARD_DELETE_SUCCESS,
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
			type: INWARD_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: INWARD_FAIL,
			payload: 'Network Error',
		});
	}
};
