import axios from 'axios';
import {
	TRAININGPREREQ_CREATE_SUCCESS,
	TRAININGPREREQ_DELETE_SUCCESS,
	TRAININGPREREQ_FAIL,
	TRAININGPREREQ_FETCH_SUCCESS,
	TRAININGPREREQ_REQUEST,
	TRAININGPREREQ_UPDATE_SUCCESS,
} from '../constants/TrainingPrereq';

export const getTrainingsPrereq = (query) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition`,
		);

		dispatch({
			type: TRAININGPREREQ_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createTrainingPrereq = (data) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPREREQ_CREATE_SUCCESS,
			payload: res.data.requisition,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateTrainingPrereq = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	console.log('s');
	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition/${id}`,
			data,
		);

		console.log(res);

		dispatch({
			type: TRAININGPREREQ_UPDATE_SUCCESS,
			payload: res.data.requisition,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingPrereq = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition/${params}`,
		);

		dispatch({
			type: TRAININGPREREQ_DELETE_SUCCESS,
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
			type: TRAININGPREREQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: TRAININGPREREQ_FAIL,
			payload: 'Network Error',
		});
	}
};
