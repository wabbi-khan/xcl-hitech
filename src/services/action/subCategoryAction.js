import axios from 'axios';
import {
	SUB_CATEGORY_CREATE_SUCCESS,
	SUB_CATEGORY_DELETE_SUCCESS,
	SUB_CATEGORY_FAIL,
	SUB_CATEGORY_FETCH_SUCCESS,
	SUB_CATEGORY_REQUEST,
	SUB_CATEGORY_UPDATE_SUCCESS,
} from '../constants/SubCategoryConstant';

export const getSubCategories = (query, cb) => async (dispatch) => {
	dispatch({
		type: SUB_CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/subCategory${
				query ? `?${query}` : ''
			}`
		);

		if (data.success) {
			dispatch({
				type: SUB_CATEGORY_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createSubCategories = (values, cb) => async (dispatch) => {
	dispatch({
		type: SUB_CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/subCategory`,
			values
		);

		if (data.success) {
			dispatch({
				type: SUB_CATEGORY_CREATE_SUCCESS,
				payload: data.subCategory,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateSubCategories = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: SUB_CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/subCategory/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: SUB_CATEGORY_UPDATE_SUCCESS,
				payload: data.subCategory,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteSubCategories = (params, cb) => async (dispatch) => {
	dispatch({
		type: SUB_CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/subCategory/${params}`
		);

		if (data.success) {
			dispatch({
				type: SUB_CATEGORY_DELETE_SUCCESS,
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
			type: SUB_CATEGORY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: SUB_CATEGORY_FAIL,
			payload: 'Network Error',
		});
	}
};
