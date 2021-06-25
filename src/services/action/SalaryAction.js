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
			`${process.env.REACT_APP_API_URL}/salary${query ? `?${query}` : ''}`,
		);

		console.log(data);

		dispatch({
			type: SALARY_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createSalariesAction = () => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/salary`);

		console.log(res.data);

		dispatch({
			type: SALARY_CREATE_SUCCESS,
			payload: res.data.salary,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateSalaryAction = (el) => async (dispatch) => {
	dispatch({
		type: SALARY_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/salary/${el._id}`,
		);

		console.log(res.data);

		dispatch({
			type: SALARY_UPDATE_SUCCESS,
			payload: { salary: res.data.salary },
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		dispatch({
			type: SALARY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: SALARY_FAIL,
			payload: 'Network Error',
		});
	}
};
