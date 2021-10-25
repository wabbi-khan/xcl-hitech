import axios from 'axios';
import {
	SALARY_REQUEST,
	SALARY_FAIL,
	SALARY_FETCH_SUCCESS,
	SALARY_CREATE_SUCCESS,
	SALARY_UPDATE_SUCCESS,
} from '../constants/SalaryConstant';

export const getSalariesAction = (query) => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/salary${query ? `?${query}` : ''}`
		);

		dispatch({
			type: SALARY_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createSalariesAction = (cb) => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/salary`
		);

		if (data.success) {
			dispatch({
				type: SALARY_CREATE_SUCCESS,
				payload: data.salary,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const paidSalaryAction = (el, cb) => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/salary/paid/${el._id}`
		);

		if (data.success) {
			dispatch({
				type: SALARY_UPDATE_SUCCESS,
				payload: { salary: data.salary },
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const unpaidSalaryAction = (el, cb) => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/salary/unPaid/${el._id}`
		);

		if (data.success) {
			dispatch({
				type: SALARY_UPDATE_SUCCESS,
				payload: { salary: data.salary },
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: SALARY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: SALARY_FAIL,
			payload: 'Network Error',
		});
	}
};
