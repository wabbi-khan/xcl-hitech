import axios from 'axios';
import {
	EXPERIENCE_CREATE_SUCCESS,
	EXPERIENCE_DELETE_SUCCESS,
	EXPERIENCE_FAIL,
	EXPERIENCE_FETCH_SUCCESS,
	EXPERIENCE_REQUEST,
	EXPERIENCE_UPDATE_SUCCESS,
} from '../constants/ExperienceConst';

export const getExperiences = (query, cb) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/experience`
		);

		if (data.success) {
			dispatch({
				type: EXPERIENCE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createExperience = (experience, cb) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/experience`,
			experience
		);

		if (data.success) {
			dispatch({
				type: EXPERIENCE_CREATE_SUCCESS,
				payload: data.experience,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateExperience = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/experience/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: EXPERIENCE_UPDATE_SUCCESS,
				payload: data.experience,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteExperience = (params, cb) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/experience/${params}`
		);

		dispatch({
			type: EXPERIENCE_DELETE_SUCCESS,
			payload: params,
		});
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: EXPERIENCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: EXPERIENCE_FAIL,
			payload: 'Network Error',
		});
	}
};
