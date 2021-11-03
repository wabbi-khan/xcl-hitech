import axios from 'axios';
import {
	TRAINING_EVALUATION_CREATE_SUCCESS,
	TRAINING_EVALUATION_DELETE_SUCCESS,
	TRAINING_EVALUATION_FAIL,
	TRAINING_EVALUATION_FETCH_SUCCESS,
	TRAINING_EVALUATION_REQUEST,
	TRAINING_EVALUATION_UPDATE_SUCCESS,
} from '../constants/TrainingEvaluationConstant';

export const getTrainingEvaluations = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_EVALUATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/evaluation`
		);

		if (data.success) {
			dispatch({
				type: TRAINING_EVALUATION_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createTrainingEvaluation = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_EVALUATION_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/evaluation`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAINING_EVALUATION_CREATE_SUCCESS,
				payload: data.evaluation,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateTrainingEvaluation = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAINING_EVALUATION_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/evaluation/${id}`,
			data
		);

		dispatch({
			type: TRAINING_EVALUATION_UPDATE_SUCCESS,
			payload: res.data.training,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingEvaluation = (params) => async (dispatch) => {
	dispatch({
		type: TRAINING_EVALUATION_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/evaluation/${params}`
		);

		dispatch({
			type: TRAINING_EVALUATION_DELETE_SUCCESS,
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
			type: TRAINING_EVALUATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: TRAINING_EVALUATION_FAIL,
			payload: 'Network Error',
		});
	}
};
