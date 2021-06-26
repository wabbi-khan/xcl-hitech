import axios from 'axios';
import {
	ATTENDANCE_REQUEST,
	ATTENDANCE_FAIL,
	ATTENDANCE_FETCH_SUCCESS,
	ATTENDANCE_CREATE_SUCCESS,
	ATTENDANCE_UPDATE_SUCCESS,
	ATTENDANCE_DELETE_SUCCESS,
} from '../constants/attendanceConstant';

export const getAttendanceAction = (query) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/attendance${query ? `?${query}` : ''}`,
		);

		dispatch({
			type: ATTENDANCE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const attendanceToggler = (attendance) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/attendance/${attendance._id}`,
		);

		console.log(res.data);
		dispatch({
			type: ATTENDANCE_UPDATE_SUCCESS,
			payload: {
				attendance: res.data.attendance,
			},
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createAttendanceAction = (attendance) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/attendance`);

		console.log(res.data.attendance);

		dispatch({
			type: ATTENDANCE_CREATE_SUCCESS,
			payload: res.data.attendance,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateAttendanceAction = (id, data) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/attendance/${id}`,
			data,
		);

		console.log(res.data);

		dispatch({
			type: ATTENDANCE_UPDATE_SUCCESS,
			payload: {
				attendance: res.data.attendance,
				verifiedMsg: res.data.verifiedMsg,
			},
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteAttendanceAction = (params) => async (dispatch) => {
	dispatch({
		type: ATTENDANCE_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/attendance/${params}`);

		dispatch({
			type: ATTENDANCE_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		dispatch({
			type: ATTENDANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: ATTENDANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
