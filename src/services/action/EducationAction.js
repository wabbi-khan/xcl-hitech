import axios from 'axios';
import {
	EDUCATION_CREATE_SUCCESS,
	EDUCATION_DELETE_SUCCESS,
	EDUCATION_FAIL,
	EDUCATION_FETCH_SUCCESS,
	EDUCATION_REQUEST,
	EDUCATION_UPDATE_SUCCESS,
} from '../constants/EducationConst';

export const getEducations = () => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/education`,
		);

		dispatch({
			type: EDUCATION_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createEducation = (education) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/education`,
			education,
		);

		dispatch({
			type: EDUCATION_CREATE_SUCCESS,
			payload: res.data.education,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateEducation = (id, data) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/education/${id}`,
			data,
		);

		dispatch({
			type: EDUCATION_UPDATE_SUCCESS,
			payload: res.data.education,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteEducation = (params) => async (dispatch) => {
	dispatch({
		type: EDUCATION_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/education/${params}`);

		dispatch({
			type: EDUCATION_DELETE_SUCCESS,
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
			type: EDUCATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EDUCATION_FAIL,
			payload: 'Network Error',
		});
	}
};
