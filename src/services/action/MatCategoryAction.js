import axios from 'axios';
import {
	CATEGORY_FAIL,
	CATEGORY_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_FETCH_SUCCESS,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_UPDATE_SUCCESS,
} from '../constants/MatCategoryConst';

export const getMaterialCategoryAction = (cb) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/category`
		);

		if (data.success) {
			dispatch({
				type: CATEGORY_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createMatCategoryAction = (category, cb) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/category`,
			category
		);

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
			data
		);

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

export const deleteMatCategoryAction = (params, cb) => async (dispatch) => {
	dispatch({
		type: CATEGORY_REQUEST,
	});

	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/category/${params}`
		);

		if (res.status === 200) {
			dispatch({
				type: CATEGORY_DELETE_SUCCESS,
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
