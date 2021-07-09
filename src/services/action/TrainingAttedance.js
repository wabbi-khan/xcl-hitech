import axios from 'axios';
import {
	TRAININGATTENDANCE_CREATE_SUCCESS,
	TRAININGATTENDANCE_DELETE_SUCCESS,
	TRAININGATTENDANCE_FAIL,
	TRAININGATTENDANCE_FETCH_SUCCESS,
	TRAININGATTENDANCE_REQUEST,
	TRAININGATTENDANCE_UPDATE_SUCCESS,
} from '../constants/TrainingAttendance';

export const getTrainingsAttendance = (query) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/attendance${
				query ? `?${query}` : ''
			}`,
		);

		console.log(data);

		dispatch({
			type: TRAININGATTENDANCE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};
export const createTrainingAttendance = (data) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/attendance`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGATTENDANCE_CREATE_SUCCESS,
			payload: res.data.attendance,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const markAsAbsent = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/attendance/${id}`,
		);

		dispatch({
			type: TRAININGATTENDANCE_UPDATE_SUCCESS,
			payload: res.data.attendance,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingAttendance = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGATTENDANCE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/attendance/${params}`,
		);

		dispatch({
			type: TRAININGATTENDANCE_DELETE_SUCCESS,
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
			type: TRAININGATTENDANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: TRAININGATTENDANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
