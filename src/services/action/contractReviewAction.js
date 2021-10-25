import axios from 'axios';
import {
	CONTRACT_REVIEW_CREATE_SUCCESS,
	CONTRACT_REVIEW_DELETE_SUCCESS,
	CONTRACT_REVIEW_FAIL,
	CONTRACT_REVIEW_FETCH_SUCCESS,
	CONTRACT_REVIEW_REQUEST,
	CONTRACT_REVIEW_UPDATE_SUCCESS,
} from '../constants/ContractReviewConstant';

export const getContractReview = (query, cb) => async (dispatch) => {
	dispatch({
		type: CONTRACT_REVIEW_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/contractReview`
		);

		if (data.success) {
			dispatch({
				type: CONTRACT_REVIEW_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createContractReview = (values, cb) => async (dispatch) => {
	dispatch({
		type: CONTRACT_REVIEW_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/contractReview`,
			values
		);

		if (data.success) {
			dispatch({
				type: CONTRACT_REVIEW_CREATE_SUCCESS,
				payload: data.contractReview,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateContractReview = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: CONTRACT_REVIEW_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/contractReview/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: CONTRACT_REVIEW_UPDATE_SUCCESS,
				payload: data.contractReview,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteContractReview = (params, cb) => async (dispatch) => {
	dispatch({
		type: CONTRACT_REVIEW_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/contractReview/${params}`
		);

		if (data.success) {
			dispatch({
				type: CONTRACT_REVIEW_DELETE_SUCCESS,
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
			type: CONTRACT_REVIEW_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: CONTRACT_REVIEW_FAIL,
			payload: 'Network Error',
		});
	}
};
