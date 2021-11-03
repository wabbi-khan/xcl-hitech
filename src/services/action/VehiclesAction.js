import axios from 'axios';
import {
	VEHICLE_CREATE_SUCCESS,
	VEHICLE_DELETE_SUCCESS,
	VEHICLE_FAIL,
	VEHICLE_FETCH_SUCCESS,
	VEHICLE_REQUEST,
	VEHICLE_UPDATE_SUCCESS,
} from '../constants/VehiclesConst';

export const getVehicles = (query, cb) => async (dispatch) => {
	dispatch({
		type: VEHICLE_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/vehicle${query ? `?${query}` : ''}`
		);

		if (data.success) {
			dispatch({
				type: VEHICLE_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createVehicles = (values, cb) => async (dispatch) => {
	dispatch({
		type: VEHICLE_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/vehicle`,
			values
		);

		if (data.success) {
			dispatch({
				type: VEHICLE_CREATE_SUCCESS,
				payload: data.vehicle,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateVehicles = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: VEHICLE_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/vehicle/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: VEHICLE_UPDATE_SUCCESS,
				payload: data.vehicle,
			});
			if (cb) cb(null, data);
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteVehicles = (params, cb) => async (dispatch) => {
	dispatch({
		type: VEHICLE_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/vehicle/${params}`
		);

		if (data.success) {
			dispatch({
				type: VEHICLE_DELETE_SUCCESS,
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
			type: VEHICLE_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: VEHICLE_FAIL,
			payload: 'Network Error',
		});
	}
};
