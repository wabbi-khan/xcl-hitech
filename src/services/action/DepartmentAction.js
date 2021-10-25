import axios from 'axios';
import {
	DEPARTMENT_REQUEST,
	DEPARTMENT_FAIL,
	DEPARTMENT_CREATE_SUCCESS,
	DEPARTMENT_DELETE_SUCCESS,
	DEPARTMENT_FETCH_SUCCESS,
	DEPARTMENT_UPDATE_SUCCESS,
} from '../constants/DepartmentConst';

export const fetchDepartmentsAction = (cb) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/department`
		);

		if (data.success) {
			dispatch({
				type: DEPARTMENT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createDepartmentAction = (department, cb) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/department`,
			department
		);

		if (res.status === 200) {
			dispatch({
				type: DEPARTMENT_CREATE_SUCCESS,
				payload: res.data.department,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateDepartmentAction = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/department/${id}`,
			data
		);

		if (res.status === 200) {
			dispatch({
				type: DEPARTMENT_UPDATE_SUCCESS,
				payload: res.data.department,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteDepartmentAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: DEPARTMENT_REQUEST,
	});

	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/department/${id}`
		);

		if (res.status === 200) {
			dispatch({
				type: DEPARTMENT_DELETE_SUCCESS,
				payload: id,
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
			type: DEPARTMENT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: DEPARTMENT_FAIL,
			payload: 'Network Error',
		});
	}
};
