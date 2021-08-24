import axios from 'axios';
import {
	TRAININGPREREQ_CREATE_SUCCESS,
	TRAININGPREREQ_DELETE_SUCCESS,
	TRAININGPREREQ_FAIL,
	TRAININGPREREQ_FETCH_SUCCESS,
	TRAININGPREREQ_REQUEST,
	TRAININGPREREQ_UPDATE_SUCCESS,
} from '../constants/TrainingPrereq';

export const getTrainingsPrereq = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition`,
		);

		if (data.success) {
			dispatch({
				type: TRAININGPREREQ_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const getByDepartmentAndDesignation =
	(departmentId, desigId) => async (dispatch) => {
		dispatch({
			type: TRAININGPREREQ_REQUEST,
		});

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/trainings/pre-requisition/by/${departmentId}/${desigId}`,
			);

			dispatch({
				type: TRAININGPREREQ_FETCH_SUCCESS,
				payload: data.requisitions,
			});
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const createTrainingPrereq = (values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition`,
			values,
		);

		if (data.success) {
			dispatch({
				type: TRAININGPREREQ_CREATE_SUCCESS,
				payload: data.requisition,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateTrainingPrereq = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition/${id}`,
			values,
		);

		if (data.success) {
			dispatch({
				type: TRAININGPREREQ_UPDATE_SUCCESS,
				payload: data.requisition,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteTrainingPrereq = (params, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/pre-requisition/${params}`,
		);

		if (data.success) {
			dispatch({
				type: TRAININGPREREQ_DELETE_SUCCESS,
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
			type: TRAININGPREREQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: TRAININGPREREQ_FAIL,
			payload: 'Network Error',
		});
	}
};
