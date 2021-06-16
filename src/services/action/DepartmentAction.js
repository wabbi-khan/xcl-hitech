import axios from 'axios';
import {
	DEPARTMENT_REQUEST,
	DEPARTMENT_FAIL,
	DEPARTMENT_CREATE_SUCCESS,
	DEPARTMENT_DELETE_SUCCESS,
	DEPARTMENT_FETCH_SUCCESS,
	DEPARTMENT_UPDATE_SUCCESS,
} from '../constants/DepartmentConst';

export const fetchDepartmentsAction = () => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/department`,
		);

		dispatch({
			type: DEPARTMENT_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createDepartmentAction = (department) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/department`,
			department,
		);

		dispatch({
			type: DEPARTMENT_CREATE_SUCCESS,
			payload: res.data.department,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateDeaprtmentAction = (id, data) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/department/${id}`,
			data,
		);

		dispatch({
			type: DEPARTMENT_UPDATE_SUCCESS,
			payload: res.data.department,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteDepartmentAction = (id) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/department/${id}`);

		dispatch({
			type: DEPARTMENT_DELETE_SUCCESS,
			payload: id,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		dispatch({
			type: DEPARTMENT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: DEPARTMENT_FAIL,
			payload: 'Network Error',
		});
	}
};
