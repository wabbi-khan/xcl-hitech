import axios from 'axios';
import {
	EMPLOYEE_CREATE_SUCCESS,
	EMPLOYEE_DELETE_SUCCESS,
	EMPLOYEE_FAIL,
	EMPLOYEE_FETCH_SUCCESS,
	EMPLOYEE_UNHIRED_FETCH_SUCCESS,
	EMPLOYEE_REQUEST,
	EMPLOYEE_SINGLE_FETCH_SUCCESS,
	EMPLOYEE_UPDATE_SUCCESS,
} from '../constants/EmployeesConst';

export const getEmployees = (query, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${
				process.env.REACT_APP_API_URL
			}/employees?isHired=true&sort=finalDesignation${
				query ? `&${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: EMPLOYEE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const getSingleEmployee = (id) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/employees/${id}`
		);

		dispatch({
			type: EMPLOYEE_SINGLE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const getUnHiredEmployees = (query, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/employees?isHired=false${
				query ? `&${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: EMPLOYEE_UNHIRED_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createEmployee = (data, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		if (data.picture) {
			const formData = new FormData();

			formData.append('file', data.picture);
			formData.append('upload_preset', 'q2yuodxb');
			let img = await axios.post(
				`https://api.cloudinary.com/v1_1/dcbwrkyux/image/upload`,
				formData
			);

			data.picture = img.data.url;
		}

		let res = await axios.post(
			`${process.env.REACT_APP_API_URL}/employees`,
			data
		);

		if (res.data.status === 'OK') {
			dispatch({
				type: EMPLOYEE_CREATE_SUCCESS,
				payload: res.data.employee,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateEmployee = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		if (values.picture) {
			const formData = new FormData();

			formData.append('file', values.picture);
			formData.append('upload_preset', 'q2yuodxb');
			let img = await axios.post(
				`https://api.cloudinary.com/v1_1/dcbwrkyux/image/upload`,
				formData
			);

			values.picture = img.data.url;
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/employees/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: EMPLOYEE_UPDATE_SUCCESS,
				payload: data.employee,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const promoteEmployee = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/employees/promote/${id}`,
			data
		);

		dispatch({
			type: EMPLOYEE_UPDATE_SUCCESS,
			payload: res.data.employee,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const hireEmployee = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/employees/hire/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: EMPLOYEE_UPDATE_SUCCESS,
				payload: data.employee,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteEmployee = (params, cb) => async (dispatch) => {
	dispatch({
		type: EMPLOYEE_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/employees/${params}`
		);

		if (data.success) {
			dispatch({
				type: EMPLOYEE_DELETE_SUCCESS,
				payload: params,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const getEmployeeByDesignationAndDepartment =
	(designation, department) => async (dispatch) => {
		dispatch({
			type: EMPLOYEE_REQUEST,
		});

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/employees/?finalDesignation=${designation}&finalDepartment=${department}`
			);

			dispatch({
				type: EMPLOYEE_FETCH_SUCCESS,
				payload: data.data,
			});
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const getEmployeeByDesignation =
	(designation, cb) => async (dispatch) => {
		dispatch({
			type: EMPLOYEE_REQUEST,
		});

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/employees/?finalDesignation=${designation}`
			);

			if (data.success) {
				dispatch({
					type: EMPLOYEE_FETCH_SUCCESS,
					payload: data.data,
				});
				if (cb) cb(data.data);
			}
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: EMPLOYEE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: EMPLOYEE_FAIL,
			payload: 'Network Error',
		});
	}
};
