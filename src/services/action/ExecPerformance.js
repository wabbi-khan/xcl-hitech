import axios from 'axios';
import {
	EXECPERFORMANCE_REQUEST,
	EXECPERFORMANCE_FAIL,
	EXECPERFORMANCE_FETCH_SUCCESS,
	EXECPERFORMANCE_CREATE_SUCCESS,
	EXECPERFORMANCE_UPDATE_SUCCESS,
	EXECPERFORMANCE_DELETE_SUCCESS,
} from '../constants/ExecPerofrmaceConstant';

export const getExtEmpPerformanceAction = (query) => async (dispatch) => {
	dispatch({
		type: EXECPERFORMANCE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/executive-employees/performance${
				query ? `?${query}` : ''
			}`
		);

		dispatch({
			type: EXECPERFORMANCE_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createExtEmpPerformanceAction =
	(performance, cb) => async (dispatch) => {
		dispatch({
			type: EXECPERFORMANCE_REQUEST,
		});
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/executive-employees/performance`,
				performance
			);

			if (res.status === 200) {
				dispatch({
					type: EXECPERFORMANCE_CREATE_SUCCESS,
					payload: res.data.performance,
				});

				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const updateExtEmpPerformanceAction =
	(id, performance, cb) => async (dispatch) => {
		dispatch({
			type: EXECPERFORMANCE_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/executive-employees/performance/${id}`,
				performance
			);

			dispatch({
				type: EXECPERFORMANCE_UPDATE_SUCCESS,
				payload: { performance: res.data.performance },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteExtEmpPerformanceAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: EXECPERFORMANCE_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/executive-employees/performance/${id}`
		);

		dispatch({
			type: EXECPERFORMANCE_DELETE_SUCCESS,
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
			type: EXECPERFORMANCE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EXECPERFORMANCE_FAIL,
			payload: 'Network Error',
		});
	}
};
