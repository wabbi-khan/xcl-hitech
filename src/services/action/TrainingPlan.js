import axios from 'axios';
import {
	TRAININGPLAN_CREATE_SUCCESS,
	TRAININGPLAN_DELETE_SUCCESS,
	TRAININGPLAN_FAIL,
	TRAININGPLAN_FETCH_SUCCESS,
	TRAININGPLAN_REQUEST,
	TRAININGPLAN_UPDATE_SUCCESS,
} from '../constants/TrainingPlan';

export const getTrainingsPlanes = (query) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/planes`,
		);

		dispatch({
			type: TRAININGPLAN_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createTrainingPlanes = (data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/planes`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPLAN_CREATE_SUCCESS,
			payload: res.data.plane,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateTrainingPlanes = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	console.log('s');
	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/${id}`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPLAN_UPDATE_SUCCESS,
			payload: res.data.plane,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};
export const startTrainingPlane = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	console.log('s');
	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/start/${id}`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPLAN_UPDATE_SUCCESS,
			payload: res.data.plane,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};
export const endTrainingPlane = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	console.log('s');
	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/end/${id}`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPLAN_UPDATE_SUCCESS,
			payload: res.data.plane,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingPlanes = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/plane/${params}`,
		);

		dispatch({
			type: TRAININGPLAN_DELETE_SUCCESS,
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
			type: TRAININGPLAN_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: TRAININGPLAN_FAIL,
			payload: 'Network Error',
		});
	}
};
