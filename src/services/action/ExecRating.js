import axios from 'axios';
import {
	EXECRAT_REQUEST,
	EXECRAT_FAIL,
	EXECRAT_FETCH_SUCCESS,
	EXECRAT_CREATE_SUCCESS,
	EXECRAT_UPDATE_SUCCESS,
	EXECRAT_DELETE_SUCCESS,
} from '../constants/ExecRat';

export const getExtEmpRatingAction = (query) => async (dispatch) => {
	dispatch({
		type: EXECRAT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/executive-employees/rating${
				query ? `?${query}` : ''
			}`
		);

		dispatch({
			type: EXECRAT_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createExtEmpRatingAction = (rating, cb) => async (dispatch) => {
	dispatch({
		type: EXECRAT_REQUEST,
	});
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/executive-employees/rating`,
			rating
		);

		dispatch({
			type: EXECRAT_CREATE_SUCCESS,
			payload: res.data.rating,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateExtEmpRatingAction =
	(id, rating, cb) => async (dispatch) => {
		dispatch({
			type: EXECRAT_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/executive-employees/rating/${id}`,
				rating
			);

			dispatch({
				type: EXECRAT_UPDATE_SUCCESS,
				payload: { rating: res.data.rating },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteExtEmpRatingAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: EXECRAT_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/executive-employees/rating/${id}`
		);

		dispatch({
			type: EXECRAT_DELETE_SUCCESS,
			payload: id,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		dispatch({
			type: EXECRAT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EXECRAT_FAIL,
			payload: 'Network Error',
		});
	}
};
