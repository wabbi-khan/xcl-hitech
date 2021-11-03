import axios from 'axios';
import {
	MATERIAL_FAIL,
	MATERIAL_REQUEST,
	MATERIAL_FETCH_SUCCESS,
	MATERIAL_CREATE_SUCCESS,
	MATERIAL_UPDATE_SUCCESS,
	MATERIAL_DELETE_SUCCESS,
} from '../constants/MaterialConst';

export const getMaterialAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/material${query ? `?${query}` : ''}`
		);

		if (data.success) {
			dispatch({
				type: MATERIAL_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createMaterialAction = (material, cb) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/material`,
			material
		);

		if (data.success) {
			dispatch({
				type: MATERIAL_CREATE_SUCCESS,
				payload: data.material,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateMaterialAction = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/material/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: MATERIAL_UPDATE_SUCCESS,
				payload: data.material,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteMaterialAction = (params, cb) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/material/${params}`
		);

		if (data.success) {
			dispatch({
				type: MATERIAL_DELETE_SUCCESS,
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
			type: MATERIAL_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: MATERIAL_FAIL,
			payload: 'Network Error',
		});
	}
};
