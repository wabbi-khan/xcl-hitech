import axios from 'axios';
import {
	SALES_CONTRACT_CREATE_SUCCESS,
	SALES_CONTRACT_DELETE_SUCCESS,
	SALES_CONTRACT_FAIL,
	SALES_CONTRACT_FETCH_SUCCESS,
	SALES_CONTRACT_REQUEST,
	SALES_CONTRACT_UPDATE_SUCCESS,
} from '../constants/SalesContractConstant';

export const getSalesContract = (query, cb) => async (dispatch) => {
	dispatch({
		type: SALES_CONTRACT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/salesContract`
		);

		if (data.success) {
			dispatch({
				type: SALES_CONTRACT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createSalesContract = (values, cb) => async (dispatch) => {
	dispatch({
		type: SALES_CONTRACT_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/salesContract`,
			values
		);

		if (data.success) {
			dispatch({
				type: SALES_CONTRACT_CREATE_SUCCESS,
				payload: data.salesContract,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateSalesContract = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: SALES_CONTRACT_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/salesContract/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: SALES_CONTRACT_UPDATE_SUCCESS,
				payload: data.salesContract,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteSalesContract = (params, cb) => async (dispatch) => {
	dispatch({
		type: SALES_CONTRACT_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/salesContract/${params}`
		);

		if (data.success) {
			dispatch({
				type: SALES_CONTRACT_DELETE_SUCCESS,
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
			type: SALES_CONTRACT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: SALES_CONTRACT_FAIL,
			payload: 'Network Error',
		});
	}
};
