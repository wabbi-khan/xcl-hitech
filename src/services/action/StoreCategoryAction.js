import axios from 'axios';
import {
	STORE_CATEGORY_CREATE_SUCCESS,
	STORE_CATEGORY_DELETE_SUCCESS,
	STORE_CATEGORY_FAIL,
	STORE_CATEGORY_FETCH_SUCCESS,
	STORE_CATEGORY_REQUEST,
	STORE_CATEGORY_UPDATE_SUCCESS,
} from '../constants/StoreCategoryConst';

export const getStoreCategory = (query, cb) => async (dispatch) => {
	dispatch({
		type: STORE_CATEGORY_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/store-category`
		);

		dispatch({
			type: STORE_CATEGORY_FETCH_SUCCESS,
			payload: data.category,
		});
		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createStoreCategory = (skill, cb) => async (dispatch) => {
	dispatch({
		type: STORE_CATEGORY_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/store-category`,
			skill
		);

		if (res.success || res.status === 200) {
			dispatch({
				type: STORE_CATEGORY_CREATE_SUCCESS,
				payload: res.data.category,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateStoreCategory = (id, data, cb) => async (dispatch) => {
	dispatch({
		type: STORE_CATEGORY_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/store-category/${id}`,
			data
		);

		dispatch({
			type: STORE_CATEGORY_UPDATE_SUCCESS,
			payload: res.data.category,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteStoreCategory = (params, cb) => async (dispatch) => {
	dispatch({
		type: STORE_CATEGORY_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/store-category/${params}`
		);

		dispatch({
			type: STORE_CATEGORY_DELETE_SUCCESS,
			payload: params,
		});
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: STORE_CATEGORY_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: STORE_CATEGORY_FAIL,
			payload: 'Network Error',
		});
	}
};
