import axios from 'axios';
import {
	UNIT_CREATE_SUCCESS,
	UNIT_DELETE_SUCCESS,
	UNIT_FAIL,
	UNIT_FETCH_SUCCESS,
	UNIT_REQUEST,
	UNIT_UPDATE_SUCCESS,
} from '../constants/UnitConst';

export const getUnits = (query, cb) => async (dispatch) => {
	dispatch({
		type: UNIT_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/unit`);

		if (data.success) {
			dispatch({
				type: UNIT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createUnit = (values, cb) => async (dispatch) => {
	dispatch({
		type: UNIT_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/unit`,
			values
		);

		if (data.status === 'OK') {
			dispatch({
				type: UNIT_CREATE_SUCCESS,
				payload: data.unit,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateUnit = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: UNIT_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/unit/${id}`,
			values
		);

		if (data.status === 'OK') {
			dispatch({
				type: UNIT_UPDATE_SUCCESS,
				payload: data.unit,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteUnit = (params, cb) => async (dispatch) => {
	dispatch({
		type: UNIT_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/unit/${params}`
		);

		if (data.status === 'OK') {
			dispatch({
				type: UNIT_DELETE_SUCCESS,
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
			type: UNIT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: UNIT_FAIL,
			payload: 'Network Error',
		});
	}
};
