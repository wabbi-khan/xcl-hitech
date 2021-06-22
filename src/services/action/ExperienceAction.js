import axios from 'axios';
import {
	EXPERIENCE_CREATE_SUCCESS,
	EXPERIENCE_DELETE_SUCCESS,
	EXPERIENCE_FAIL,
	EXPERIENCE_FETCH_SUCCESS,
	EXPERIENCE_REQUEST,
	EXPERIENCE_UPDATE_SUCCESS,
} from '../constants/ExperienceConst';

export const getExperiences = (query) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/experience`,
		);

		console.log(data);

		dispatch({
			type: EXPERIENCE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createExperience = (experience) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/experience`,
			experience,
		);

		dispatch({
			type: EXPERIENCE_CREATE_SUCCESS,
			payload: res.data.experience,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateExperience = (id, data) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/experience/${id}`,
			data,
		);

		dispatch({
			type: EXPERIENCE_UPDATE_SUCCESS,
			payload: res.data.experience,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteExperience = (params) => async (dispatch) => {
	dispatch({
		type: EXPERIENCE_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/experience/${params}`);

		dispatch({
			type: EXPERIENCE_DELETE_SUCCESS,
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
			type: EXPERIENCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EXPERIENCE_FAIL,
			payload: 'Network Error',
		});
	}
};
