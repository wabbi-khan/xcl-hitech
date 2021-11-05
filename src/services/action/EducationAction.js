import axios from 'axios';
import {
	EDUCATION_CREATE_SUCCESS,
	EDUCATION_DELETE_SUCCESS,
	EDUCATION_FAIL,
	EDUCATION_FETCH_SUCCESS,
	EDUCATION_REQUEST,
	EDUCATION_UPDATE_SUCCESS,
} from '../constants/EducationConst';

export const getEducations = (query, cb) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/education`
		);

		if (data.success) {
			dispatch({
				type: EDUCATION_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createEducation = (values, cb) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/education`,
			values
		);

		if (data.success) {
			dispatch({
				type: EDUCATION_CREATE_SUCCESS,
				payload: data.education,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateEducation = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/education/${id}`,
			values
		);

		console.log(data);

		if (data.success) {
			dispatch({
				type: EDUCATION_UPDATE_SUCCESS,
				payload: data.education,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteEducation = (params, cb) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/education/${params}`
		);

		if (data.success) {
			dispatch({
				type: EDUCATION_DELETE_SUCCESS,
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
			type: EDUCATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: EDUCATION_FAIL,
			payload: 'Network Error',
		});
	}
};
