import axios from 'axios';
import {
	NONEXTPERFORMANCE_REQUEST,
	NONEXTPERFORMANCE_FAIL,
	NONEXTPERFORMANCE_FETCH_SUCCESS,
	NONEXTPERFORMANCE_CREATE_SUCCESS,
	NONEXTPERFORMANCE_UPDATE_SUCCESS,
	NONEXTPERFORMANCE_DELETE_SUCCESS,
} from '../constants/NonExtPerformanceConstant';

export const getNonExtEmpPerformanceAction =
	(query, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});

		try {
			const { data } = await axios.get(
				`${
					process.env.REACT_APP_API_URL
				}/nonExecutive-employees/performance${query ? `?${query}` : ''}`
			);

			if (data.success) {
				dispatch({
					type: NONEXTPERFORMANCE_FETCH_SUCCESS,
					payload: data.data,
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const createNonExtEmpPerformanceAction =
	(values, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance`,
				values
			);

			if (data.success) {
				dispatch({
					type: NONEXTPERFORMANCE_CREATE_SUCCESS,
					payload: data.performance,
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const updateNonExtEmpPerformanceAction =
	(id, values, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});

		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance/${id}`,
				values
			);

			if (data.success) {
				dispatch({
					type: NONEXTPERFORMANCE_UPDATE_SUCCESS,
					payload: { performance: data.performance },
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const deleteNonExtEmpPerformanceAction =
	(id, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});

		try {
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance/${id}`
			);

			if (data.success) {
				dispatch({
					type: NONEXTPERFORMANCE_DELETE_SUCCESS,
					payload: id,
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
			type: NONEXTPERFORMANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: NONEXTPERFORMANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
