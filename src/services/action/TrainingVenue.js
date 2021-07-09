import axios from 'axios';
import {
	TRAININGVENUE_CREATE_SUCCESS,
	TRAININGVENUE_DELETE_SUCCESS,
	TRAININGVENUE_FAIL,
	TRAININGVENUE_FETCH_SUCCESS,
	TRAININGVENUE_REQUEST,
	TRAININGVENUE_UPDATE_SUCCESS,
} from '../constants/TrainingVenueConstant';

export const getTrainingVenues = (query) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/venue`,
		);

		dispatch({
			type: TRAININGVENUE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createTrainingVenue = (data) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/venue`,
			data,
		);

		dispatch({
			type: TRAININGVENUE_CREATE_SUCCESS,
			payload: res.data.venue,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateTrainingVenue = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${id}`,
			data,
		);

		dispatch({
			type: TRAININGVENUE_UPDATE_SUCCESS,
			payload: res.data.venue,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingVenue = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${params}`,
		);

		dispatch({
			type: TRAININGVENUE_DELETE_SUCCESS,
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
			type: TRAININGVENUE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: TRAININGVENUE_FAIL,
			payload: 'Network Error',
		});
	}
};
