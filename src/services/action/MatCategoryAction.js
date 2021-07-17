import axios from 'axios';
import {
	CATEGORY_FAIL,
	CATEGORY_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_FETCH_SUCCESS,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_UPDATE_SUCCESS,
} from '../constants/MatCategoryConst';

export const getMaterialCategoryAction = () => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/category`);

		dispatch({
			type: CATEGORY_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createMatCategoryAction = (category, cb) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/category`,
			category,
		);

		console.log(res);

		if (res.status === 200) {
			dispatch({
				type: CATEGORY_CREATE_SUCCESS,
				payload: res.data.category,
			});
			if (cb) cb();
		} else {
			if (cb) cb('Something went wrong');
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateMatCategoryAction = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/category/${id}`,
			data,
		);

		console.log(res);

		if (res.status === 200) {
			dispatch({
				type: CATEGORY_UPDATE_SUCCESS,
				payload: res.data.category,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteMatCategoryAction = (params) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/category/${params}`);

		dispatch({
			type: CATEGORY_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: CATEGORY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: CATEGORY_FAIL,
			payload: 'Network Error',
		});
	}
};
