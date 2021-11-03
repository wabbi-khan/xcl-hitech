import axios from 'axios';
import {
	TRAININGATTENDANCE_CREATE_SUCCESS,
	TRAININGATTENDANCE_DELETE_SUCCESS,
	TRAININGATTENDANCE_FAIL,
	TRAININGATTENDANCE_FETCH_SUCCESS,
	TRAININGATTENDANCE_REQUEST,
	TRAININGATTENDANCE_UPDATE_SUCCESS,
} from '../constants/TrainingAttendance';

export const getTrainingsAttendance = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/attendance${
				query ? `?${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: TRAININGATTENDANCE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};
export const createTrainingAttendance = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/attendance`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAININGATTENDANCE_CREATE_SUCCESS,
				payload: data.attendance,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const markAsAbsent = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/attendance/${id}`
		);

		if (data.success) {
			dispatch({
				type: TRAININGATTENDANCE_UPDATE_SUCCESS,
				payload: data.attendance,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteTrainingAttendance = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/attendance/${params}`
		);

		dispatch({
			type: TRAININGATTENDANCE_DELETE_SUCCESS,
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
			type: TRAININGATTENDANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Newtwork Error');
		dispatch({
			type: TRAININGATTENDANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
