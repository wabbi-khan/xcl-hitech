import axios from 'axios';
import {
	ATTENDANCE_REQUEST,
	ATTENDANCE_FAIL,
	ATTENDANCE_FETCH_SUCCESS,
	ATTENDANCE_CREATE_SUCCESS,
	ATTENDANCE_UPDATE_SUCCESS,
	ATTENDANCE_DELETE_SUCCESS,
} from '../constants/attendanceConstant';

export const getAttendanceAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/attendance${
				query ? `?${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: ATTENDANCE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb(null, data);
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const attendanceToggler = (attendance) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/attendance/${attendance._id}`
		);

		dispatch({
			type: ATTENDANCE_UPDATE_SUCCESS,
			payload: {
				attendance: res.data.attendance,
			},
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createAttendanceAction = (attendance, cb) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/attendance`
		);

		if (data.success) {
			dispatch({
				type: ATTENDANCE_CREATE_SUCCESS,
				payload: data.todayAttendance,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateAttendanceAction = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/attendance/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: ATTENDANCE_UPDATE_SUCCESS,
				payload: {
					attendance: data.attendance,
					verifiedMsg: data.verifiedMsg,
				},
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteAttendanceAction = (params) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/attendance/${params}`
		);

		dispatch({
			type: ATTENDANCE_DELETE_SUCCESS,
			payload: params,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: ATTENDANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: ATTENDANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
