import axios from 'axios';
import {
	MATERIAL_FAIL,
	MATERIAL_REQUEST,
	MATERIAL_FETCH_SUCCESS,
	MATERIAL_CREATE_SUCCESS,
	MATERIAL_UPDATE_SUCCESS,
	MATERIAL_DELETE_SUCCESS,
} from '../constants/MaterialConst';

export const getMaterialAction = (query) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/material${query ? `?${query}` : ''}`,
		);

		console.log(data)

		dispatch({
			type: MATERIAL_FETCH_SUCCESS,
			payload: data.data,
		});

		// console.log(fetchApiData.data.material);
	} catch (err) {
		dispatch({
			type: MATERIAL_FAIL,
			payload: err,
		});
	}
};

export const createMaterialAction = (material) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/material`,
			material,
		);

		dispatch({
			type: MATERIAL_CREATE_SUCCESS,
			payload: res.data.material,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateMaterialAction = (id, data) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/material/${id}`,
			data,
		);

		dispatch({
			type: MATERIAL_UPDATE_SUCCESS,
			payload: res.data.material,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteMaterialAction = (params) => async (dispatch) => {
	dispatch({
		type: MATERIAL_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/material/${params}`);

		dispatch({
			type: MATERIAL_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response.data.error);
		dispatch({
			type: MATERIAL_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: MATERIAL_FAIL,
			payload: 'Network Error',
		});
	}
};
