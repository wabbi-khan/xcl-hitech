import axios from 'axios';
import {
	OUTWARD_GATE_PASS_CREATE_SUCCESS,
	OUTWARD_GATE_PASS_DELETE_SUCCESS,
	OUTWARD_GATE_PASS_FAIL,
	OUTWARD_GATE_PASS_FETCH_SUCCESS,
	OUTWARD_GATE_PASS_REQUEST,
	OUTWARD_GATE_PASS_UPDATE_SUCCESS,
} from '../constants/outwardGatePassConstant';

export const getOutwardGatePasses = (query, cb) => async (dispatch) => {
	dispatch({
		type: OUTWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/outwardGatePass`
		);

		if (data.success) {
			dispatch({
				type: OUTWARD_GATE_PASS_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createOutwardGatePasses = (values, cb) => async (dispatch) => {
	dispatch({
		type: OUTWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/outwardGatePass`,
			values
		);

		if (data.success) {
			dispatch({
				type: OUTWARD_GATE_PASS_CREATE_SUCCESS,
				payload: data.outwardGatePass,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateOutwardGatePasses = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: OUTWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/outwardGatePass/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: OUTWARD_GATE_PASS_UPDATE_SUCCESS,
				payload: data.outwardGatePass,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteOutwardGatePasses = (params, cb) => async (dispatch) => {
	dispatch({
		type: OUTWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/outwardGatePass/${params}`
		);

		if (data.success) {
			dispatch({
				type: OUTWARD_GATE_PASS_DELETE_SUCCESS,
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
			type: OUTWARD_GATE_PASS_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: OUTWARD_GATE_PASS_FAIL,
			payload: 'Network Error',
		});
	}
};
