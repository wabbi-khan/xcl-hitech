import axios from 'axios';
import {
	NONEXECPREREQ_REQUEST,
	NONEXECPREREQ_FAIL,
	NONEXECPREREQ_FETCH_SUCCESS,
	NONEXECPREREQ_CREATE_SUCCESS,
	NONEXECPREREQ_UPDATE_SUCCESS,
	NONEXECPREREQ_DELETE_SUCCESS,
} from '../constants/NonExecPrereq';

export const getNonExtEmpAssesAction = (query) => async (dispatch) => {
	dispatch({
		type: NONEXECPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/assessment${
				query ? `?${query}` : ''
			}`,
		);

		console.log(data);

		dispatch({
			type: NONEXECPREREQ_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createNonExtEmpAssesAction = (assessment) => async (dispatch) => {
	dispatch({
		type: NONEXECPREREQ_REQUEST,
	});
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/assessment`,
			assessment,
		);

		console.log(res);

		dispatch({
			type: NONEXECPREREQ_CREATE_SUCCESS,
			payload: res.data.assessment,
		});

		// console.log(data);
	} catch (err) {
		console.log('object');
		dispatchError(err, dispatch);
	}
};

export const updateNonExtEmpAssesAction =
	(id, assessment, cb) => async (dispatch) => {
		dispatch({
			type: NONEXECPREREQ_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/nonExecutive-employees/assessment/${id}`,
				assessment,
			);

			console.log(res.data);

			dispatch({
				type: NONEXECPREREQ_UPDATE_SUCCESS,
				payload: { assessment: res.data.assessment },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteNonExtEmpAssesAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: NONEXECPREREQ_REQUEST,
	});

	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/nonExecutive-employees/assessment/${id}`,
		);

		console.log(res.data);

		dispatch({
			type: NONEXECPREREQ_DELETE_SUCCESS,
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
			type: NONEXECPREREQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: NONEXECPREREQ_FAIL,
			payload: 'Network Error',
		});
	}
};
