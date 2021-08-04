import axios from 'axios';
import {
	DESIGNATION_CREATE_SUCCESS,
	DESIGNATION_DELETE_SUCCESS,
	DESIGNATION_FAIL,
	DESIGNATION_FETCH_SUCCESS,
	DESIGNATION_REQUEST,
	DESIGNATION_UPDATE_SUCCESS,
} from '../constants/DesignationConst';

export const getDesignation = (query, cb) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/designation${query ? `?${query}` : ''}`,
		);

		if (data.success) {
			dispatch({
				type: DESIGNATION_FETCH_SUCCESS,
				payload: data.data,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createDesignation = (material, cb) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/designation`,
			material,
		);

		if (data.success) {
			dispatch({
				type: DESIGNATION_CREATE_SUCCESS,
				payload: data.designation,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateDesignation = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/designation/${id}`,
			values,
		);

		if (data.success) {
			dispatch({
				type: DESIGNATION_UPDATE_SUCCESS,
				payload: data.designation,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteDesignation = (params, cb) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/designation/${params}`,
		);

		if (data.success) {
			dispatch({
				type: DESIGNATION_DELETE_SUCCESS,
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
			type: DESIGNATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: DESIGNATION_FAIL,
			payload: 'Network Error',
		});
	}
};
