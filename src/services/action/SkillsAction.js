import axios from 'axios';
import {
	SKILL_CREATE_SUCCESS,
	SKILL_DELETE_SUCCESS,
	SKILL_FAIL,
	SKILL_FETCH_SUCCESS,
	SKILL_REQUEST,
	SKILL_UPDATE_SUCCESS,
} from '../constants/SkillsConst';

export const getSkills = (query, cb) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/skills`
		);

		if (data.success) {
			dispatch({
				type: SKILL_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createSkill = (skill, cb) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/skills`,
			skill
		);

		if (data.success) {
			dispatch({
				type: SKILL_CREATE_SUCCESS,
				payload: data.skill,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updateSkill = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/skills/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: SKILL_UPDATE_SUCCESS,
				payload: data.skill,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const deleteSkill = (params, cb) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_API_URL}/skills/${params}`
		);

		if (data.success) {
			dispatch({
				type: SKILL_DELETE_SUCCESS,
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
			type: SKILL_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: SKILL_FAIL,
			payload: 'Network Error',
		});
	}
};
