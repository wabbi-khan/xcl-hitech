import axios from 'axios';
import {
	TRAINING_CREATE_SUCCESS,
	TRAINING_DELETE_SUCCESS,
	TRAINING_FAIL,
	TRAINING_FETCH_SUCCESS,
	TRAINING_REQUEST,
	TRAINING_UPDATE_SUCCESS,
} from '../constants/TrainingConstant';

export const getTrainings = (query) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings`,
		);

		dispatch({
			type: TRAINING_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createTraining = (data) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings`,
			data,
		);

		dispatch({
			type: TRAINING_CREATE_SUCCESS,
			payload: res.data.training,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateTraining = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/${id}`,
			data,
		);

		dispatch({
			type: TRAINING_UPDATE_SUCCESS,
			payload: res.data.training,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTraining = (params) => async (dispatch) => {
	dispatch({
		type: TRAINING_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/trainings/${params}`);

		dispatch({
			type: TRAINING_DELETE_SUCCESS,
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
			type: TRAINING_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: TRAINING_FAIL,
			payload: 'Network Error',
		});
	}
};
