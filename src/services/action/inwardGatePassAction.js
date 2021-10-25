import axios from 'axios';
import {
	INWARD_GATE_PASS_CREATE_SUCCESS,
	INWARD_GATE_PASS_DELETE_SUCCESS,
	INWARD_GATE_PASS_FAIL,
	INWARD_GATE_PASS_FETCH_SUCCESS,
	INWARD_GATE_PASS_REQUEST,
	INWARD_GATE_PASS_UPDATE_SUCCESS,
} from '../constants/InwardGatePassConstant';

export const getInwardGatePasses = (query, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/inwardGatePass`
		);

		if (data.success) {
			dispatch({
				type: INWARD_GATE_PASS_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createInwardGatePasses = (values, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/inwardGatePass`,
			values
		);

		if (data.success) {
			dispatch({
				type: INWARD_GATE_PASS_CREATE_SUCCESS,
				payload: data.inwardGatePass,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateInwardGatePasses = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/inwardGatePass/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: INWARD_GATE_PASS_UPDATE_SUCCESS,
				payload: data.inwardGatePass,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteInwardGatePasses = (params, cb) => async (dispatch) => {
	dispatch({
		type: INWARD_GATE_PASS_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/inwardGatePass/${params}`
		);

		if (data.success) {
			dispatch({
				type: INWARD_GATE_PASS_DELETE_SUCCESS,
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
			type: INWARD_GATE_PASS_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: INWARD_GATE_PASS_FAIL,
			payload: 'Network Error',
		});
	}
};
