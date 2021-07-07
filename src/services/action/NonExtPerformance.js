import axios from 'axios';
import {
	NONEXTPERFORMANCE_REQUEST,
	NONEXTPERFORMANCE_FAIL,
	NONEXTPERFORMANCE_FETCH_SUCCESS,
	NONEXTPERFORMANCE_CREATE_SUCCESS,
	NONEXTPERFORMANCE_UPDATE_SUCCESS,
	NONEXTPERFORMANCE_DELETE_SUCCESS,
} from '../constants/NonExtPerformanceConstant';

export const getNonExtEmpPerformanceAction = (query) => async (dispatch) => {
	dispatch({
		type: NONEXTPERFORMANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance${
				query ? `?${query}` : ''
			}`,
		);

		console.log(data);

		dispatch({
			type: NONEXTPERFORMANCE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createNonExtEmpPerformanceAction =
	(performance, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance`,
				performance,
			);

			console.log(res);

			dispatch({
				type: NONEXTPERFORMANCE_CREATE_SUCCESS,
				payload: res.data.performance,
			});

			if (cb) cb();
		} catch (err) {
			console.log('object');
			dispatchError(err, dispatch);
		}
	};

export const updateNonExtEmpPerformanceAction =
	(id, performance, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance/${id}`,
				performance,
			);

			console.log(res.data);

			dispatch({
				type: NONEXTPERFORMANCE_UPDATE_SUCCESS,
				payload: { performance: res.data.performance },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteNonExtEmpPerformanceAction =
	(id, cb) => async (dispatch) => {
		dispatch({
			type: NONEXTPERFORMANCE_REQUEST,
		});

		try {
			const res = await axios.delete(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/performance/${id}`,
			);

			console.log(res.data);

			dispatch({
				type: NONEXTPERFORMANCE_DELETE_SUCCESS,
				payload: id,
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

const dispatchError = (err, dispatch) => {
	console.log(err);
	if (err.response) {
		console.log(err.response.data);
		dispatch({
			type: NONEXTPERFORMANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: NONEXTPERFORMANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
