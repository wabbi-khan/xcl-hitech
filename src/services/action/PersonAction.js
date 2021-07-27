import axios from 'axios';
import {
	PERSON_REQUEST,
	PERSON_FETCH_SUCCESS,
	PERSON_FAIL,
	// PERSON_CREATE_SUCCESS,
	// PERSON_DELETE_SUCCESS,
	// PERSON_UPDATE_SUCCESS,
} from '../constants/ContactPerson';

export const fetchPersonAction = () => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/persons`);

		console.log(data);

		dispatch({
			type: PERSON_FETCH_SUCCESS,
			payload: data.persons,
		});
	} catch (err) {
		dispatch({
			type: PERSON_FAIL,
			payload: err,
		});
	}
};
export const createPersonAction = () => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/persons`);

		dispatch({
			type: PERSON_FETCH_SUCCESS,
			payload: data.persons,
		});
	} catch (err) {
		dispatch({
			type: PERSON_FAIL,
			payload: err,
		});
	}
};
export const updatePersonAction = () => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/persons`);

		dispatch({
			type: PERSON_FETCH_SUCCESS,
			payload: data.persons,
		});
	} catch (err) {
		dispatch({
			type: PERSON_FAIL,
			payload: err,
		});
	}
};
export const deletePersonAction = () => async (dispatch) => {
	dispatch({
		type: PERSON_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/persons`);

		dispatch({
			type: PERSON_FETCH_SUCCESS,
			payload: data.persons,
		});
	} catch (err) {
		dispatch({
			type: PERSON_FAIL,
			payload: err,
		});
	}
};
