import axios from 'axios';
import {
	LEAVE_REQUEST,
	LEAVE_FAIL,
	LEAVE_FETCH_SUCCESS,
	LEAVE_CREATE_SUCCESS,
	LEAVE_UPDATE_SUCCESS,
} from '../constants/LeaveConstant';

export const getLeavesAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/leaves${query ? `?${query}` : ''}`
		);

		if (data.success) {
			dispatch({
				type: LEAVE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createLeavesAction = (leave, cb) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/leaves`,
			leave
		);

		if (data.success) {
			dispatch({
				type: LEAVE_CREATE_SUCCESS,
				payload: data.leave,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateLeavesAction = (el) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/leaves/${el._id}`
		);

		dispatch({
			type: LEAVE_UPDATE_SUCCESS,
			payload: { salary: res.data.leave },
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: LEAVE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');

		dispatch({
			type: LEAVE_FAIL,
			payload: 'Network Error',
		});
	}
};
