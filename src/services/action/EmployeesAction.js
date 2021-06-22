import { FormatBoldTwoTone } from '@material-ui/icons';
import axios from 'axios';
import {
	EMPLOYEE_CREATE_SUCCESS,
	EMPLOYEE_DELETE_SUCCESS,
	EMPLOYEE_FAIL,
	EMPLOYEE_FETCH_SUCCESS,
	EMPLOYEE_REQUEST,
	EMPLOYEE_UPDATE_SUCCESS,
} from '../constants/EmployeesConst';

export const getEmployees = (query) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/employees`,
		);

		dispatch({
			type: EMPLOYEE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createEmployee = (data) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	console.log(data);

	try {
		let res = await axios.post(
			`${process.env.REACT_APP_API_URL}/employees`,
			data,
		);

		if (data.picture) {
			const formData = new FormData();

			formData.append('picture', data.picture);
			res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/employees/${res.data.employee._id}/uploadimage`,
				formData,
			);
		}

		dispatch({
			type: EMPLOYEE_CREATE_SUCCESS,
			payload: res.data.employee,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateEmployee = (id, data) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/employees/${id}`,
			data,
		);

		dispatch({
			type: EMPLOYEE_UPDATE_SUCCESS,
			payload: res.data.employee,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteEmployee = (params) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${params}`);

		dispatch({
			type: EMPLOYEE_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response);
		dispatch({
			type: EMPLOYEE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EMPLOYEE_FAIL,
			payload: 'Network Error',
		});
	}
};
