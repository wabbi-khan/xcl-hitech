import axios from 'axios';
import {
	JOB_DESCRIPTION_CREATE_SUCCESS,
	JOB_DESCRIPTION_DELETE_SUCCESS,
	JOB_DESCRIPTION_FAIL,
	JOB_DESCRIPTION_FETCH_SUCCESS,
	JOB_DESCRIPTION_REQUEST,
	JOB_DESCRIPTION_UPDATE_SUCCESS,
} from '../constants/JobDescriptionConst';

export const getJobDescriptions = (query, cb) => async (dispatch) => {
	dispatch({
		type: JOB_DESCRIPTION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/job-description`
		);

		if (data.success) {
			dispatch({
				type: JOB_DESCRIPTION_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createJobDescriptions = (values, cb) => async (dispatch) => {
	dispatch({
		type: JOB_DESCRIPTION_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/job-description`,
			values
		);

		if (data.success) {
			dispatch({
				type: JOB_DESCRIPTION_CREATE_SUCCESS,
				payload: data.description,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateJobDescriptions = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: JOB_DESCRIPTION_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/job-description/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: JOB_DESCRIPTION_UPDATE_SUCCESS,
				payload: data.description,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteJobDescriptions = (params, cb) => async (dispatch) => {
	dispatch({
		type: JOB_DESCRIPTION_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/job-description/${params}`
		);

		if (data.success) {
			dispatch({
				type: JOB_DESCRIPTION_DELETE_SUCCESS,
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
			type: JOB_DESCRIPTION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: JOB_DESCRIPTION_FAIL,
			payload: 'Network Error',
		});
	}
};
