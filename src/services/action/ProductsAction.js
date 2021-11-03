import axios from 'axios';
import {
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_FAIL,
	PRODUCT_FETCH_SUCCESS,
	PRODUCT_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/ProductsConst';

export const getProducts = (query, cb) => async (dispatch) => {
	dispatch({
		type: PRODUCT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/product`
		);

		if (data.success) {
			dispatch({
				type: PRODUCT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createProducts = (values, cb) => async (dispatch) => {
	dispatch({
		type: PRODUCT_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/product`,
			values
		);

		if (data.success) {
			dispatch({
				type: PRODUCT_CREATE_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateProducts = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: PRODUCT_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/product/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: PRODUCT_UPDATE_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteProducts = (params, cb) => async (dispatch) => {
	dispatch({
		type: PRODUCT_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/product/${params}`
		);

		if (data.success) {
			dispatch({
				type: PRODUCT_DELETE_SUCCESS,
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
			type: PRODUCT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: PRODUCT_FAIL,
			payload: 'Network Error',
		});
	}
};
