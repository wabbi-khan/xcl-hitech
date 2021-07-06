import axios from 'axios';
import {
	LEAVE_REQUEST,
	LEAVE_FAIL,
	LEAVE_FETCH_SUCCESS,
	LEAVE_CREATE_SUCCESS,
	LEAVE_UPDATE_SUCCESS,
} from '../constants/LeaveConstant';

export const getLeavesAction = (query) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/leaves${query ? `?${query}` : ''}`,
		);

		console.log(data);

		dispatch({
			type: LEAVE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createLeavesAction = (leave) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/leaves`,
			leave,
		);

		console.log(res);

		dispatch({
			type: LEAVE_CREATE_SUCCESS,
			payload: res.data.leave,
		});

		// console.log(data);
	} catch (err) {
		console.log('object');
		dispatchError(err, dispatch);
	}
};

export const updateLeavesAction = (el) => async (dispatch) => {
	dispatch({
		type: LEAVE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/leaves/${el._id}`,
		);

		console.log(res.data);

		dispatch({
			type: LEAVE_UPDATE_SUCCESS,
			payload: { salary: res.data.leave },
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	console.log(err);
	if (err.response) {
		console.log(err.response.data);
		dispatch({
			type: LEAVE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: LEAVE_FAIL,
			payload: 'Network Error',
		});
	}
};
