import axios from 'axios';
import {
	PERSON_CREATE_SUCCESS,
	PERSON_DELETE_SUCCESS,
	PERSON_FAIL,
	PERSON_FETCH_SUCCESS,
	PERSON_REQUEST,
	PERSON_UPDATE_SUCCESS,
} from '../constants/ContactPerson';

export const getPersons = (query, cb) => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/persons`
		);

		if (data.success) {
			dispatch({
				type: PERSON_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createPerson = (person, cb) => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/persons`,
			person
		);

		if (data.success) {
			dispatch({
				type: PERSON_CREATE_SUCCESS,
				payload: data.person,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updatePerson = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/persons/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: PERSON_UPDATE_SUCCESS,
				payload: data.person,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deletePerson = (params, cb) => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/persons/${params}`
		);

		if (data.success) {
			dispatch({
				type: PERSON_DELETE_SUCCESS,
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
			type: PERSON_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: PERSON_FAIL,
			payload: 'Network Error',
		});
	}
};
