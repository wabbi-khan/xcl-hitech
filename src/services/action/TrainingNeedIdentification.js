import axios from 'axios';
import {
	TRAININGNEEDIDENTIFICATION_CREATE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_FAIL,
	TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS,
	TRAININGNEEDIDENTIFICATION_REQUEST,
	TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS,
} from '../constants/TrainingNeedIdentificationConstant';

export const getTrainingsIdentification = (query, cb) => async (dispatch) => {
	dispatch({
		type: TRAININGNEEDIDENTIFICATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/identification`
		);

		if (data.success) {
			dispatch({
				type: TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};
export const createTrainingIdentification =
	(values, cb) => async (dispatch) => {
		dispatch({
			type: TRAININGNEEDIDENTIFICATION_REQUEST,
		});

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_URL}/trainings/identification`,
				values
			);

			if (data.success) {
				dispatch({
					type: TRAININGNEEDIDENTIFICATION_CREATE_SUCCESS,
					payload: data.identification,
				});

				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const updateTrainingIdentification =
	(id, values, cb) => async (dispatch) => {
		dispatch({
			type: TRAININGNEEDIDENTIFICATION_REQUEST,
		});

		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_API_URL}/trainings/identification/${id}`,
				values
			);
			if (data.success) {
				dispatch({
					type: TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS,
					payload: data.identification,
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const deleteTrainingIdentification =
	(params, cb) => async (dispatch) => {
		dispatch({
			type: TRAININGNEEDIDENTIFICATION_REQUEST,
		});

		try {
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API_URL}/trainings/identification/${params}`
			);

			if (data.success) {
				dispatch({
					type: TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS,
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
			type: TRAININGNEEDIDENTIFICATION_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: TRAININGNEEDIDENTIFICATION_FAIL,
			payload: 'Network Error',
		});
	}
};
