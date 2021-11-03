import axios from 'axios';
import {
	TRAININGVENUE_CREATE_SUCCESS,
	TRAININGVENUE_DELETE_SUCCESS,
	TRAININGVENUE_FAIL,
	TRAININGVENUE_FETCH_SUCCESS,
	TRAININGVENUE_REQUEST,
	TRAININGVENUE_UPDATE_SUCCESS,
} from '../constants/TrainingVenueConstant';

export const getTrainingVenues = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/venue`
		);

		if (data.success) {
			dispatch({
				type: TRAININGVENUE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createTrainingVenue = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/venue`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAININGVENUE_CREATE_SUCCESS,
				payload: data.venue,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateTrainingVenue = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: TRAININGVENUE_UPDATE_SUCCESS,
				payload: data.venue,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteTrainingVenue = (params, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGVENUE_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${params}`
		);

		if (data.success) {
			dispatch({
				type: TRAININGVENUE_DELETE_SUCCESS,
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
		if (cb) cb(err.response.date.error);
		dispatch({
			type: TRAININGVENUE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: TRAININGVENUE_FAIL,
			payload: 'Network Error',
		});
	}
};
