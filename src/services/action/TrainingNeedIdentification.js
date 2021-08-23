import axios from 'axios';
import {
	TRAININGNEEDIDENTIFICATION_CREATE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_FAIL,
	TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS,
	TRAININGNEEDIDENTIFICATION_REQUEST,
	TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS,
} from '../constants/TrainingNeedIdentificationConstant';

export const getTrainingsIdentification = (query) => async (dispatch) => {
	dispatch({
		type: TRAININGNEEDIDENTIFICATION_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/trainings/identification`,
		);

		dispatch({
			type: TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
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
				values,
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

export const updateTrainingIdentification = (id, data) => async (dispatch) => {
	dispatch({
		type: TRAININGNEEDIDENTIFICATION_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/trainings/identification/${id}`,
			data,
		);

		dispatch({
			type: TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS,
			payload: res.data.identification,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteTrainingIdentification = (params) => async (dispatch) => {
	dispatch({
		type: TRAININGNEEDIDENTIFICATION_REQUEST,
	});

	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/trainings/identification/${params}`,
		);

		dispatch({
			type: TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
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
