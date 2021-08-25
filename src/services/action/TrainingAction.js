import axios from 'axios';
import {
	TRAINING_CREATE_SUCCESS,
	TRAINING_DELETE_SUCCESS,
	TRAINING_FAIL,
	TRAINING_FETCH_SUCCESS,
	TRAINING_REQUEST,
	TRAINING_UPDATE_SUCCESS,
} from '../constants/TrainingConstant';

export const getTrainings = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings`,
		);

		if (data.success) {
			dispatch({
				type: TRAINING_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createTraining = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings`,
			values,
		);

		if (data.success) {
			dispatch({
				type: TRAINING_CREATE_SUCCESS,
				payload: data.training,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateTraining = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/${id}`,
			values,
		);

		if (data.success) {
			dispatch({
				type: TRAINING_UPDATE_SUCCESS,
				payload: data.training,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteTraining = (params, cb) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/${params}`,
		);

		if (data.success) {
			dispatch({
				type: TRAINING_DELETE_SUCCESS,
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
			type: TRAINING_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: TRAINING_FAIL,
			payload: 'Network Error',
		});
	}
};
