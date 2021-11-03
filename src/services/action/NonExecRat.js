import axios from 'axios';
import {
	NONEXECRAT_REQUEST,
	NONEXECRAT_FAIL,
	NONEXECRAT_FETCH_SUCCESS,
	NONEXECRAT_CREATE_SUCCESS,
	NONEXECRAT_UPDATE_SUCCESS,
	NONEXECRAT_DELETE_SUCCESS,
} from '../constants/NonExecRat';

export const getNonExtEmpRatAction = (query) => async (dispatch) => {
	dispatch({
		type: NONEXECRAT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/rating${
				query ? `?${query}` : ''
			}`
		);

		dispatch({
			type: NONEXECRAT_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createNonExtEmpRatAction = (rating) => async (dispatch) => {
	dispatch({
		type: NONEXECRAT_REQUEST,
	});
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/rating`,
			rating
		);

		dispatch({
			type: NONEXECRAT_CREATE_SUCCESS,
			payload: res.data.rating,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateNonExtEmpRatAction =
	(id, rating, cb) => async (dispatch) => {
		dispatch({
			type: NONEXECRAT_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/rating/${id}`,
				rating
			);

			dispatch({
				type: NONEXECRAT_UPDATE_SUCCESS,
				payload: { rating: res.data.rating },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteNonExtEmpRatAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: NONEXECRAT_REQUEST,
	});

	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/rating/${id}`
		);

		dispatch({
			type: NONEXECRAT_DELETE_SUCCESS,
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
			type: NONEXECRAT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: NONEXECRAT_FAIL,
			payload: 'Network Error',
		});
	}
};
