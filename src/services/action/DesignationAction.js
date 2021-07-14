import axios from 'axios';
import {
	DESIGNATION_CREATE_SUCCESS,
	DESIGNATION_DELETE_SUCCESS,
	DESIGNATION_FAIL,
	DESIGNATION_FETCH_SUCCESS,
	DESIGNATION_REQUEST,
	DESIGNATION_UPDATE_SUCCESS,
} from '../constants/DesignationConst';

export const getDesignation = (query) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/designation${query ? `?${query}` : ''}`,
		);

		dispatch({
			type: DESIGNATION_FETCH_SUCCESS,
			payload: data.data,
		});

		// console.log(fetchApiData.data.material);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createDesignation = (material) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/designation`,
			material,
		);

		dispatch({
			type: DESIGNATION_CREATE_SUCCESS,
			payload: res.data.designation,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateDesignation = (id, data) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/designation/${id}`,
			data,
		);

		dispatch({
			type: DESIGNATION_UPDATE_SUCCESS,
			payload: res.data.designation,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteDesignation = (params) => async (dispatch) => {
	dispatch({
		type: DESIGNATION_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/designation/${params}`);

		dispatch({
			type: DESIGNATION_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response.data.error);
		dispatch({
			type: DESIGNATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: DESIGNATION_FAIL,
			payload: 'Network Error',
		});
	}
};
