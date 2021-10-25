import axios from 'axios';
import {
	TRAININGPLAN_CREATE_SUCCESS,
	TRAININGPLAN_DELETE_SUCCESS,
	TRAININGPLAN_FAIL,
	TRAININGPLAN_FETCH_SUCCESS,
	TRAININGPLAN_REQUEST,
	TRAININGPLAN_UPDATE_SUCCESS,
} from '../constants/TrainingPlan';

export const getTrainingsPlanes = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/planes`
		);

		if (data.success) {
			dispatch({
				type: TRAININGPLAN_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createTrainingPlanes = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/planes`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAININGPLAN_CREATE_SUCCESS,
				payload: data.plane,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateTrainingPlanes = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAININGPLAN_UPDATE_SUCCESS,
				payload: data.plane,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};
export const startTrainingPlane = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/start/${id}`,
			data
		);

		dispatch({
			type: TRAININGPLAN_UPDATE_SUCCESS,
			payload: res.data.plane,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};
export const endTrainingPlane = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/plane/end/${id}`,
			data
		);

		dispatch({
			type: TRAININGPLAN_UPDATE_SUCCESS,
			payload: res.data.plane,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingPlanes = (params, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPLAN_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/plane/${params}`
		);

		if (data.success) {
			dispatch({
				type: TRAININGPLAN_DELETE_SUCCESS,
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
			type: TRAININGPLAN_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');

		dispatch({
			type: TRAININGPLAN_FAIL,
			payload: 'Network Error',
		});
	}
};
