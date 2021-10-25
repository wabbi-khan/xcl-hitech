import axios from 'axios';
import {
	USER_CREATE_SUCCESS,
	USER_DELETE_SUCCESS,
	USER_FAIL,
	USER_FETCH_SUCCESS,
	USER_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_LOGOUT,
} from '../constants/UserConstant';

export const loginUser = (user, cb) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/login`,
			user
		);

		if (data.success) {
			dispatch({
				type: USER_FETCH_SUCCESS,
				payload: data.user,
			});
			localStorage.setItem('token', data.token);
			if (cb) cb();
		}
	} catch (err) {
		if (cb) cb(err?.response?.data?.error);
		dispatchError(err, dispatch, cb);
	}
};

export const logOutUser = (user, cb) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		dispatch({
			type: USER_LOGOUT,
			payload: {},
		});
		localStorage.removeItem('token');
		if (cb) cb();
	} catch (err) {
		if (cb) cb(err?.response?.data?.error);
		dispatchError(err, dispatch, cb);
	}
};

export const getUser = (cb) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		const { data } = await axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/auth/me`,
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});

		if (data.success) {
			dispatch({
				type: USER_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createTrainingVenue = (data) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/venue`,
			data
		);

		dispatch({
			type: USER_CREATE_SUCCESS,
			payload: res.data.venue,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateTrainingVenue = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${id}`,
			data
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: res.data.venue,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingVenue = (params) => async (dispatch) => {
	dispatch({
		type: USER_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/venue/${params}`
		);

		dispatch({
			type: USER_DELETE_SUCCESS,
			payload: params,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: USER_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: USER_FAIL,
			payload: 'Network Error',
		});
	}
};
